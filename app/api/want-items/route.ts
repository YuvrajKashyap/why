import {
  createWantItem,
  getWantItemError,
  listWantItems,
  validateWantItemInput,
} from "@/lib/wantItems";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await listWantItems();
    return Response.json({ items });
  } catch (error) {
    return getWantItemError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const input = typeof body === "object" && body ? body : {};
    const { errors, values } = validateWantItemInput(input);

    if (errors.length > 0 || !values.name) {
      return Response.json({ error: errors.join(" ") }, { status: 400 });
    }

    const item = await createWantItem({
      link: values.link ?? "",
      name: values.name,
      notes: values.notes ?? "",
      price: values.price ?? "",
    });

    return Response.json({ item }, { status: 201 });
  } catch (error) {
    return getWantItemError(error);
  }
}
