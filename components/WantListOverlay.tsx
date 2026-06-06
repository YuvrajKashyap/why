"use client";

import { FormEvent, useEffect, useState } from "react";
import type { WantItem } from "@/lib/wantItems";

type WantListOverlayProps = {
  open: boolean;
  onClose: () => void;
};

type WantDraft = {
  name: string;
  notes: string;
  link: string;
  price: string;
};

const emptyDraft: WantDraft = {
  link: "",
  name: "",
  notes: "",
  price: "",
};

const ledgerGridStyle = {
  gridTemplateColumns:
    "minmax(14rem, 1.15fr) minmax(18rem, 1.45fr) minmax(8rem, 0.55fr) minmax(9rem, 0.65fr) 8.5rem",
};

const fieldLabelClass =
  "flex min-w-0 flex-col gap-1 text-[0.66rem] font-black uppercase tracking-[0.14em] text-[#674622]/70";

const inputClass =
  "h-11 min-w-0 rounded-[3px] border border-[#9a7240]/25 bg-[#fff8e9]/78 px-3 text-sm font-semibold normal-case tracking-normal text-[#27190f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition focus:border-[#2f6f5c] focus:bg-[#fffdf4] focus:ring-2 focus:ring-[#2f6f5c]/18";

const textareaClass =
  "min-h-11 min-w-0 resize-y rounded-[3px] border border-[#9a7240]/25 bg-[#fff8e9]/78 px-3 py-2 text-sm font-semibold normal-case leading-5 tracking-normal text-[#27190f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition focus:border-[#2f6f5c] focus:bg-[#fffdf4] focus:ring-2 focus:ring-[#2f6f5c]/18";

const actionButtonClass =
  "h-9 rounded-[3px] border border-[#5e4429]/20 px-3 text-xs font-black uppercase tracking-[0.11em] text-[#46321f] transition hover:bg-[#46321f] hover:text-[#fff3d8] disabled:cursor-not-allowed disabled:opacity-50";

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const body = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(body.error ?? "Request failed.");
  }

  return body;
}

function getLinkLabel(link: string) {
  if (!link) {
    return "";
  }

  try {
    const url = new URL(link);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
}

export function WantListOverlay({ open, onClose }: WantListOverlayProps) {
  const [items, setItems] = useState<WantItem[]>([]);
  const [draft, setDraft] = useState<WantDraft>(emptyDraft);
  const [editDraft, setEditDraft] = useState<WantDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    let canceled = false;

    async function loadItems() {
      setError("");
      setLoading(true);

      try {
        const data = await requestJson<{ items: WantItem[] }>("/api/want-items");

        if (!canceled) {
          setItems(data.items);
        }
      } catch (loadError) {
        if (!canceled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load the list.",
          );
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    void loadItems();

    return () => {
      canceled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const data = await requestJson<{ item: WantItem }>("/api/want-items", {
        body: JSON.stringify(draft),
        method: "POST",
      });

      setItems((current) => [...current, data.item]);
      setDraft(emptyDraft);
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Could not add item.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(id: string) {
    setError("");
    setSaving(true);

    try {
      const data = await requestJson<{ item: WantItem }>(`/api/want-items/${id}`, {
        body: JSON.stringify(editDraft),
        method: "PATCH",
      });

      setItems((current) =>
        current.map((item) => (item.id === id ? data.item : item)),
      );
      setEditingId(null);
      setEditDraft(emptyDraft);
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Could not update item.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this want?")) {
      return;
    }

    setError("");
    setSaving(true);

    try {
      await requestJson<{ item: WantItem }>(`/api/want-items/${id}`, {
        method: "DELETE",
      });
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete item.",
      );
    } finally {
      setSaving(false);
    }
  }

  function beginEdit(item: WantItem) {
    setEditingId(item.id);
    setEditDraft({
      link: item.link,
      name: item.name,
      notes: item.notes,
      price: item.price,
    });
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#11140e] px-2 py-3 text-[#281a10] sm:px-5 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 50%, rgba(246, 198, 111, 0.18) 0 9%, transparent 10%),
            radial-gradient(ellipse at 50% 50%, transparent 0 17%, rgba(82, 47, 25, 0.68) 18%, transparent 21%),
            radial-gradient(ellipse at 50% 50%, transparent 0 31%, rgba(179, 103, 48, 0.44) 32%, transparent 36%),
            radial-gradient(ellipse at 50% 50%, transparent 0 45%, rgba(79, 47, 27, 0.58) 46%, transparent 51%),
            repeating-linear-gradient(90deg, rgba(255, 219, 153, 0.07) 0 2px, transparent 2px 24px),
            linear-gradient(135deg, #2b1a11 0%, #7b431f 42%, #3b2316 100%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 18%, rgba(46, 111, 92, 0.32), transparent 20%),
            radial-gradient(circle at 82% 22%, rgba(57, 103, 136, 0.28), transparent 22%),
            radial-gradient(circle at 78% 82%, rgba(192, 75, 55, 0.22), transparent 26%)
          `,
        }}
      />

      <section
        aria-label="Want List"
        className="relative mx-auto flex h-full max-w-[1380px] flex-col overflow-hidden rounded-[6px] border border-[#f4d8a0]/35 bg-[#f6e7c7] shadow-[0_28px_90px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.58)]"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(255, 250, 229, 0.82), rgba(245, 221, 177, 0.62)),
            radial-gradient(ellipse at 8% 0%, rgba(255,255,255,0.85), transparent 28%),
            repeating-linear-gradient(0deg, transparent 0 31px, rgba(109, 78, 44, 0.075) 32px, transparent 33px)
          `,
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-[#2f6f5c] shadow-[inset_-1px_0_0_rgba(255,255,255,0.2)] sm:w-4" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#c4543a,#dfb65f,#2f6f5c,#3a6e8c)] opacity-85" />

        <header className="relative z-10 flex shrink-0 items-end justify-between gap-3 border-b border-[#8b6236]/20 px-5 pb-3 pt-5 sm:px-8 sm:pb-4 sm:pt-7">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#2f6f5c]/80">
              saved wants
            </p>
            <div className="mt-1 flex flex-wrap items-end gap-x-4 gap-y-1">
              <h2
                className="text-[2.35rem] font-semibold leading-none text-[#552f18] sm:text-[3.4rem]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Want List
              </h2>
              <span className="mb-1 rounded-full border border-[#2f6f5c]/25 bg-[#2f6f5c]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#245243]">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <button
            className="h-9 shrink-0 rounded-[3px] border border-[#46321f]/25 bg-[#fff6de]/58 px-3 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#46321f] transition hover:bg-[#46321f] hover:text-[#fff3d8] sm:h-10 sm:px-4 sm:text-xs"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </header>

        <form
          className="relative z-10 shrink-0 border-b border-[#8b6236]/18 bg-[#e9c88d]/22 px-5 py-4 sm:px-8"
          onSubmit={handleCreate}
        >
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(13rem,1.05fr)_minmax(16rem,1.3fr)_minmax(8rem,0.5fr)_minmax(9rem,0.65fr)_7rem]">
            <label className={`${fieldLabelClass} col-span-2 lg:col-span-1`}>
              Name
              <input
                className={inputClass}
                maxLength={160}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                required
                value={draft.name}
              />
            </label>

            <label className={`${fieldLabelClass} col-span-2 lg:col-span-1`}>
              Notes
              <textarea
                className={`${textareaClass} max-h-24`}
                maxLength={2000}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                value={draft.notes}
              />
            </label>

            <label className={`${fieldLabelClass} min-w-0`}>
              Price
              <input
                className={inputClass}
                maxLength={120}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    price: event.target.value,
                  }))
                }
                value={draft.price}
              />
            </label>

            <label className={`${fieldLabelClass} min-w-0`}>
              Link
              <input
                className={inputClass}
                maxLength={1000}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    link: event.target.value,
                  }))
                }
                type="text"
                value={draft.link}
              />
            </label>

            <button
              className="col-span-2 h-11 self-end rounded-[3px] bg-[#2f6f5c] px-4 text-xs font-black uppercase tracking-[0.14em] text-[#fff8e9] shadow-[0_10px_24px_rgba(47,111,92,0.22)] transition hover:bg-[#245243] disabled:cursor-not-allowed disabled:opacity-50 lg:col-span-1"
              disabled={saving}
              type="submit"
            >
              Add
            </button>
          </div>
        </form>

        {error ? (
          <div className="relative z-10 mx-5 mt-4 rounded-[3px] border border-[#c4543a]/35 bg-[#c4543a]/12 px-3 py-2 text-sm font-bold text-[#7b2e1d] sm:mx-8">
            {error}
          </div>
        ) : null}

        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pb-3 pt-4 sm:px-6 sm:pb-6">
          <div
            className="sticky top-0 z-20 hidden rounded-t-[4px] border border-[#79572f]/18 bg-[#4b331f] text-[#fff3d8] shadow-[0_8px_18px_rgba(86,54,24,0.14)] lg:grid"
            style={ledgerGridStyle}
          >
            {["Name", "Notes", "Price", "Link", ""].map((heading) => (
              <div
                className="border-r border-[#fff3d8]/12 px-4 py-3 text-[0.68rem] font-black uppercase tracking-[0.16em] last:border-r-0"
                key={heading || "actions"}
              >
                {heading}
              </div>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto rounded-b-[4px] border border-[#79572f]/18 bg-[#fff6de]/42 shadow-[inset_0_0_28px_rgba(126,82,35,0.08)] lg:border-t-0">
            {loading ? (
              <div className="flex min-h-48 items-center justify-center text-sm font-black uppercase tracking-[0.14em] text-[#5d4328]/55">
                Loading
              </div>
            ) : null}

            {!loading && items.length === 0 ? (
              <div className="flex min-h-48 items-center justify-center px-6 text-center text-sm font-black uppercase tracking-[0.14em] text-[#5d4328]/55">
                No wants yet
              </div>
            ) : null}

            {!loading
              ? items.map((item, index) => {
                  const isEditing = editingId === item.id;
                  const linkLabel = getLinkLabel(item.link);

                  return (
                    <article
                      className="group border-b border-[#8b6236]/16 last:border-b-0"
                      key={item.id}
                    >
                      {isEditing ? (
                        <div className="bg-[#fff0c9]/86 p-3 sm:p-4">
                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(12rem,1fr)_minmax(16rem,1.15fr)_minmax(8rem,0.55fr)_minmax(9rem,0.65fr)_auto_auto]">
                            <label className={fieldLabelClass}>
                              Name
                              <input
                                className={inputClass}
                                maxLength={160}
                                onChange={(event) =>
                                  setEditDraft((current) => ({
                                    ...current,
                                    name: event.target.value,
                                  }))
                                }
                                value={editDraft.name}
                              />
                            </label>

                            <label className={fieldLabelClass}>
                              Notes
                              <textarea
                                className={`${textareaClass} min-h-28 xl:min-h-11`}
                                maxLength={2000}
                                onChange={(event) =>
                                  setEditDraft((current) => ({
                                    ...current,
                                    notes: event.target.value,
                                  }))
                                }
                                value={editDraft.notes}
                              />
                            </label>

                            <label className={fieldLabelClass}>
                              Price
                              <input
                                className={inputClass}
                                maxLength={120}
                                onChange={(event) =>
                                  setEditDraft((current) => ({
                                    ...current,
                                    price: event.target.value,
                                  }))
                                }
                                value={editDraft.price}
                              />
                            </label>

                            <label className={fieldLabelClass}>
                              Link
                              <input
                                className={inputClass}
                                maxLength={1000}
                                onChange={(event) =>
                                  setEditDraft((current) => ({
                                    ...current,
                                    link: event.target.value,
                                  }))
                                }
                                value={editDraft.link}
                              />
                            </label>

                            <button
                              className="h-11 self-end rounded-[3px] bg-[#3a6e8c] px-4 text-xs font-black uppercase tracking-[0.12em] text-[#fff8e9] transition hover:bg-[#2d536a] disabled:cursor-not-allowed disabled:opacity-50"
                              disabled={saving}
                              onClick={() => void handleUpdate(item.id)}
                              type="button"
                            >
                              Save
                            </button>
                            <button
                              className={`${actionButtonClass} h-11 self-end`}
                              onClick={() => {
                                setEditingId(null);
                                setEditDraft(emptyDraft);
                              }}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div
                            className="hidden min-h-[4.75rem] bg-[#fff7e5]/62 transition group-hover:bg-[#fffaf0] lg:grid"
                            style={ledgerGridStyle}
                          >
                            <div className="min-w-0 border-r border-[#8b6236]/12 px-4 py-3">
                              <div className="flex min-w-0 items-start gap-3">
                                <span
                                  className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#c4543a]/24 bg-[#c4543a]/10 text-[0.7rem] font-black text-[#8d3c24]"
                                  style={{
                                    fontFamily:
                                      "var(--font-cormorant), Georgia, serif",
                                  }}
                                >
                                  {index + 1}
                                </span>
                                <h3 className="min-w-0 break-words text-[1.05rem] font-black leading-6 text-[#26170e]">
                                  {item.name}
                                </h3>
                              </div>
                            </div>

                            <div className="min-w-0 border-r border-[#8b6236]/12 px-4 py-3">
                              {item.notes ? (
                                <p className="line-clamp-3 whitespace-pre-wrap break-words text-sm font-semibold leading-6 text-[#46321f]/78">
                                  {item.notes}
                                </p>
                              ) : (
                                <p className="text-sm font-bold italic text-[#665036]/38">
                                  No notes
                                </p>
                              )}
                            </div>

                            <div className="min-w-0 border-r border-[#8b6236]/12 px-4 py-3">
                              {item.price ? (
                                <p className="break-words text-sm font-black leading-6 text-[#245243]">
                                  {item.price}
                                </p>
                              ) : (
                                <p className="text-sm font-bold italic text-[#665036]/38">
                                  No price
                                </p>
                              )}
                            </div>

                            <div className="min-w-0 border-r border-[#8b6236]/12 px-4 py-3">
                              {item.link ? (
                                <a
                                  className="inline-flex max-w-full truncate rounded-[3px] border border-[#3a6e8c]/18 bg-[#3a6e8c]/8 px-2 py-1 text-sm font-black text-[#2d536a] underline-offset-4 hover:underline"
                                  href={item.link}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {linkLabel}
                                </a>
                              ) : (
                                <p className="text-sm font-bold italic text-[#665036]/38">
                                  No link
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-end gap-2 px-3 py-3">
                              <button
                                className={actionButtonClass}
                                onClick={() => beginEdit(item)}
                                type="button"
                              >
                                Edit
                              </button>
                              <button
                                className="h-9 rounded-[3px] border border-[#c4543a]/35 px-3 text-xs font-black uppercase tracking-[0.11em] text-[#8d3c24] transition hover:bg-[#c4543a] hover:text-[#fff3d8] disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={saving}
                                onClick={() => void handleDelete(item.id)}
                                type="button"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-3 bg-[#fff7e5]/70 p-4 lg:hidden">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-[#c4543a]/72">
                                  {index + 1}
                                </p>
                                <h3 className="mt-1 break-words text-xl font-black leading-6 text-[#26170e]">
                                  {item.name}
                                </h3>
                              </div>
                              {item.price ? (
                                <p className="shrink-0 rounded-full bg-[#2f6f5c]/10 px-3 py-1 text-sm font-black text-[#245243]">
                                  {item.price}
                                </p>
                              ) : null}
                            </div>

                            {item.notes ? (
                              <p className="whitespace-pre-wrap break-words border-l-2 border-[#dfb65f] pl-3 text-sm font-semibold leading-6 text-[#46321f]/78">
                                {item.notes}
                              </p>
                            ) : null}

                            <div className="flex flex-wrap items-center justify-between gap-2">
                              {item.link ? (
                                <a
                                  className="min-w-0 max-w-full truncate rounded-[3px] border border-[#3a6e8c]/18 bg-[#3a6e8c]/8 px-2 py-1 text-sm font-black text-[#2d536a] underline-offset-4 hover:underline"
                                  href={item.link}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {linkLabel}
                                </a>
                              ) : (
                                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#665036]/35">
                                  No link
                                </span>
                              )}

                              <div className="flex shrink-0 gap-2">
                                <button
                                  className={actionButtonClass}
                                  onClick={() => beginEdit(item)}
                                  type="button"
                                >
                                  Edit
                                </button>
                                <button
                                  className="h-9 rounded-[3px] border border-[#c4543a]/35 px-3 text-xs font-black uppercase tracking-[0.11em] text-[#8d3c24] transition hover:bg-[#c4543a] hover:text-[#fff3d8] disabled:cursor-not-allowed disabled:opacity-50"
                                  disabled={saving}
                                  onClick={() => void handleDelete(item.id)}
                                  type="button"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </article>
                  );
                })
              : null}
          </div>
        </div>
      </section>
    </div>
  );
}
