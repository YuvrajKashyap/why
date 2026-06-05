import {
  deleteWantItem,
  getWantItemError,
  updateWantItem,
  validateWantItemInput,
} from "@/lib/wantItems";

export const dynamic = "force-dynamic";

type WantItemContext = {
  params: Promise<{
    id: string;
  }>;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function PATCH(request: Request, context: WantItemContext) {
  try {
    const { id } = await context.params;

    if (!isUuid(id)) {
      return Response.json({ error: "Invalid item id." }, { status: 400 });
    }

    const body = (await request.json()) as unknown;
    const input = typeof body === "object" && body ? body : {};
    const { errors, values } = validateWantItemInput(input, { partial: true });

    if (errors.length > 0) {
      return Response.json({ error: errors.join(" ") }, { status: 400 });
    }

    const item = await updateWantItem(id, values);

    if (!item) {
      return Response.json({ error: "Item not found." }, { status: 404 });
    }

    return Response.json({ item });
  } catch (error) {
    return getWantItemError(error);
  }
}

export async function DELETE(_request: Request, context: WantItemContext) {
  try {
    const { id } = await context.params;

    if (!isUuid(id)) {
      return Response.json({ error: "Invalid item id." }, { status: 400 });
    }

    const item = await deleteWantItem(id);

    if (!item) {
      return Response.json({ error: "Item not found." }, { status: 404 });
    }

    return Response.json({ item });
  } catch (error) {
    return getWantItemError(error);
  }
}
