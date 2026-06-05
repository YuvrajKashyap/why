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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#090706]/92 px-3 py-4 text-[#261c13] backdrop-blur-sm sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-full w-full max-w-5xl items-center">
        <section
          aria-label="Want List"
          className="relative w-full overflow-hidden border border-[#d8c8aa]/30 bg-[#f5ecd6] px-4 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:px-7 sm:py-7"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,252,240,0.65), transparent 18%), radial-gradient(ellipse at 90% 10%, rgba(196,84,58,0.1), transparent 42%)",
            borderRadius: "4px",
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'1.1\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="relative mb-5 flex items-start justify-between gap-4 border-b border-[#9e8661]/20 pb-4">
            <div>
              <h2
                className="text-3xl font-semibold leading-none text-[#5b321b] sm:text-4xl"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Want List
              </h2>
              <p className="mt-2 text-sm text-[#3a2e20]/60">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              className="border border-[#3a2e20]/20 px-3 py-2 text-sm font-semibold text-[#3a2e20] transition hover:bg-[#3a2e20] hover:text-[#f5ecd6] disabled:opacity-50"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>

          <form
            className="relative grid gap-3 border-b border-[#9e8661]/20 pb-5 md:grid-cols-[1.2fr_0.6fr] lg:grid-cols-[1.1fr_0.55fr_1fr_auto]"
            onSubmit={handleCreate}
          >
            <label className="flex flex-col gap-1 text-xs font-bold uppercase text-[#6b3a1a]/70">
              Name
              <input
                className="min-h-11 border border-[#9e8661]/25 bg-white/45 px-3 text-base font-semibold normal-case text-[#261c13] outline-none transition focus:border-[#6b3a1a]"
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

            <label className="flex flex-col gap-1 text-xs font-bold uppercase text-[#6b3a1a]/70">
              Price
              <input
                className="min-h-11 border border-[#9e8661]/25 bg-white/45 px-3 text-base normal-case text-[#261c13] outline-none transition focus:border-[#6b3a1a]"
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

            <label className="flex flex-col gap-1 text-xs font-bold uppercase text-[#6b3a1a]/70 lg:col-span-1">
              Link
              <input
                className="min-h-11 border border-[#9e8661]/25 bg-white/45 px-3 text-base normal-case text-[#261c13] outline-none transition focus:border-[#6b3a1a]"
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
              className="min-h-11 self-end bg-[#6b3a1a] px-5 text-sm font-bold text-[#f8efdc] transition hover:bg-[#4f2b14] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={saving}
              type="submit"
            >
              Add
            </button>

            <label className="flex flex-col gap-1 text-xs font-bold uppercase text-[#6b3a1a]/70 md:col-span-2 lg:col-span-4">
              Notes
              <textarea
                className="min-h-24 resize-y border border-[#9e8661]/25 bg-white/45 px-3 py-2 text-base normal-case leading-6 text-[#261c13] outline-none transition focus:border-[#6b3a1a]"
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
          </form>

          {error ? (
            <div className="relative mt-4 border border-[#c4543a]/35 bg-[#c4543a]/10 px-3 py-2 text-sm font-semibold text-[#7b2e1d]">
              {error}
            </div>
          ) : null}

          <div className="relative mt-5 flex flex-col gap-3">
            {loading ? (
              <div className="py-10 text-center text-sm font-semibold text-[#3a2e20]/55">
                Loading...
              </div>
            ) : null}

            {!loading && items.length === 0 ? (
              <div className="border border-dashed border-[#9e8661]/35 py-10 text-center text-sm font-semibold text-[#3a2e20]/55">
                No wants yet.
              </div>
            ) : null}

            {items.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <article
                  className="border-b border-[#9e8661]/20 pb-4 last:border-b-0"
                  key={item.id}
                >
                  {isEditing ? (
                    <div className="grid gap-3 md:grid-cols-[1.2fr_0.6fr] lg:grid-cols-[1.1fr_0.55fr_1fr_auto_auto]">
                      <input
                        className="min-h-10 border border-[#9e8661]/25 bg-white/50 px-3 font-semibold text-[#261c13] outline-none focus:border-[#6b3a1a]"
                        maxLength={160}
                        onChange={(event) =>
                          setEditDraft((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        value={editDraft.name}
                      />
                      <input
                        className="min-h-10 border border-[#9e8661]/25 bg-white/50 px-3 text-[#261c13] outline-none focus:border-[#6b3a1a]"
                        maxLength={120}
                        onChange={(event) =>
                          setEditDraft((current) => ({
                            ...current,
                            price: event.target.value,
                          }))
                        }
                        value={editDraft.price}
                      />
                      <input
                        className="min-h-10 border border-[#9e8661]/25 bg-white/50 px-3 text-[#261c13] outline-none focus:border-[#6b3a1a] lg:col-span-1"
                        maxLength={1000}
                        onChange={(event) =>
                          setEditDraft((current) => ({
                            ...current,
                            link: event.target.value,
                          }))
                        }
                        value={editDraft.link}
                      />
                      <button
                        className="min-h-10 bg-[#3a4a5c] px-4 text-sm font-bold text-[#f8efdc] disabled:opacity-50"
                        disabled={saving}
                        onClick={() => void handleUpdate(item.id)}
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        className="min-h-10 border border-[#3a2e20]/20 px-4 text-sm font-bold text-[#3a2e20]"
                        onClick={() => {
                          setEditingId(null);
                          setEditDraft(emptyDraft);
                        }}
                        type="button"
                      >
                        Cancel
                      </button>
                      <textarea
                        className="min-h-24 resize-y border border-[#9e8661]/25 bg-white/50 px-3 py-2 text-[#261c13] outline-none focus:border-[#6b3a1a] md:col-span-2 lg:col-span-5"
                        maxLength={2000}
                        onChange={(event) =>
                          setEditDraft((current) => ({
                            ...current,
                            notes: event.target.value,
                          }))
                        }
                        value={editDraft.notes}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="break-words text-lg font-extrabold leading-tight text-[#261c13]">
                            {item.name}
                          </h3>
                          {item.price ? (
                            <span className="text-sm font-bold text-[#6b3a1a]/75">
                              {item.price}
                            </span>
                          ) : null}
                        </div>
                        {item.notes ? (
                          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#3a2e20]/70">
                            {item.notes}
                          </p>
                        ) : null}
                        {item.link ? (
                          <a
                            className="mt-2 inline-flex max-w-full break-all text-sm font-bold text-[#3a6e8c] underline-offset-4 hover:underline"
                            href={item.link}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {getLinkLabel(item.link)}
                          </a>
                        ) : null}
                      </div>
                      <div className="flex gap-2 sm:justify-end">
                        <button
                          className="h-10 border border-[#3a2e20]/20 px-4 text-sm font-bold text-[#3a2e20] transition hover:bg-[#3a2e20] hover:text-[#f5ecd6]"
                          onClick={() => beginEdit(item)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="h-10 border border-[#c4543a]/35 px-4 text-sm font-bold text-[#7b2e1d] transition hover:bg-[#c4543a] hover:text-[#f5ecd6] disabled:opacity-50"
                          disabled={saving}
                          onClick={() => void handleDelete(item.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
