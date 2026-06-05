export type WantItem = {
  id: string;
  name: string;
  notes: string;
  link: string;
  price: string;
  created_at: string;
  updated_at: string;
};

export type WantItemInput = {
  name?: unknown;
  notes?: unknown;
  link?: unknown;
  price?: unknown;
};

type ValidationResult = {
  errors: string[];
  values: Partial<Pick<WantItem, "name" | "notes" | "link" | "price">>;
};

const WANT_ITEM_COLUMNS =
  "id,name,notes,link,price,created_at,updated_at" as const;

const LIMITS = {
  name: 160,
  notes: 2000,
  link: 1000,
  price: 120,
} as const;

class SupabaseRestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function getSupabaseEnv() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new SupabaseRestError(
      500,
      "Missing Supabase server environment variables.",
    );
  }

  return {
    key,
    url: url.replace(/\/$/, ""),
  };
}

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeLink(value: unknown, errors: string[]) {
  const rawLink = getText(value);

  if (!rawLink) {
    return "";
  }

  const link = /^https?:\/\//i.test(rawLink) ? rawLink : `https://${rawLink}`;

  if (link.length > LIMITS.link) {
    errors.push("Link is too long.");
    return "";
  }

  try {
    const url = new URL(link);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      errors.push("Link must start with http or https.");
      return "";
    }

    return url.toString();
  } catch {
    errors.push("Link must be a valid URL.");
    return "";
  }
}

export function validateWantItemInput(
  input: WantItemInput,
  options: { partial?: boolean } = {},
): ValidationResult {
  const errors: string[] = [];
  const values: ValidationResult["values"] = {};
  const partial = options.partial ?? false;

  if (!partial || "name" in input) {
    const name = getText(input.name);

    if (!name) {
      errors.push("Name is required.");
    } else if (name.length > LIMITS.name) {
      errors.push("Name is too long.");
    } else {
      values.name = name;
    }
  }

  if (!partial || "notes" in input) {
    const notes = getText(input.notes);

    if (notes.length > LIMITS.notes) {
      errors.push("Notes are too long.");
    } else {
      values.notes = notes;
    }
  }

  if (!partial || "link" in input) {
    values.link = normalizeLink(input.link, errors);
  }

  if (!partial || "price" in input) {
    const price = getText(input.price);

    if (price.length > LIMITS.price) {
      errors.push("Price is too long.");
    } else {
      values.price = price;
    }
  }

  if (partial && Object.keys(values).length === 0 && errors.length === 0) {
    errors.push("Nothing to update.");
  }

  return { errors, values };
}

function getHeaders(method: "read" | "write") {
  const { key } = getSupabaseEnv();

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(method === "read"
      ? { "Accept-Profile": "why" }
      : { "Accept-Profile": "why", "Content-Profile": "why" }),
    Authorization: `Bearer ${key}`,
    apikey: key,
  };
}

async function parseSupabaseResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return (await response.json()) as T;
  }

  let message = "Supabase request failed.";

  try {
    const body = (await response.json()) as { message?: string };
    message = body.message ?? message;
  } catch {
    const body = await response.text();
    message = body || message;
  }

  throw new SupabaseRestError(response.status, message);
}

function getWantItemsUrl(search: string) {
  const { url } = getSupabaseEnv();
  return `${url}/rest/v1/want_items?${search}`;
}

export async function listWantItems() {
  const search = new URLSearchParams({
    order: "created_at.asc",
    select: WANT_ITEM_COLUMNS,
  });

  const response = await fetch(getWantItemsUrl(search.toString()), {
    cache: "no-store",
    headers: getHeaders("read"),
  });

  return parseSupabaseResponse<WantItem[]>(response);
}

export async function createWantItem(input: Pick<WantItem, "name" | "notes" | "link" | "price">) {
  const search = new URLSearchParams({ select: WANT_ITEM_COLUMNS });
  const response = await fetch(getWantItemsUrl(search.toString()), {
    body: JSON.stringify(input),
    cache: "no-store",
    headers: {
      ...getHeaders("write"),
      Prefer: "return=representation",
    },
    method: "POST",
  });
  const items = await parseSupabaseResponse<WantItem[]>(response);

  return items[0] ?? null;
}

export async function updateWantItem(
  id: string,
  input: Partial<Pick<WantItem, "name" | "notes" | "link" | "price">>,
) {
  const search = new URLSearchParams({
    id: `eq.${id}`,
    select: WANT_ITEM_COLUMNS,
  });
  const response = await fetch(getWantItemsUrl(search.toString()), {
    body: JSON.stringify(input),
    cache: "no-store",
    headers: {
      ...getHeaders("write"),
      Prefer: "return=representation",
    },
    method: "PATCH",
  });
  const items = await parseSupabaseResponse<WantItem[]>(response);

  return items[0] ?? null;
}

export async function deleteWantItem(id: string) {
  const search = new URLSearchParams({
    id: `eq.${id}`,
    select: WANT_ITEM_COLUMNS,
  });
  const response = await fetch(getWantItemsUrl(search.toString()), {
    cache: "no-store",
    headers: {
      ...getHeaders("write"),
      Prefer: "return=representation",
    },
    method: "DELETE",
  });
  const items = await parseSupabaseResponse<WantItem[]>(response);

  return items[0] ?? null;
}

export function getWantItemError(error: unknown) {
  if (error instanceof SupabaseRestError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  return Response.json({ error: "Something went wrong." }, { status: 500 });
}
