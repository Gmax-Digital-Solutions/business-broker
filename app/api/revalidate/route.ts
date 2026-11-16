import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Revalidation is only available in development." },
      { status: 403 },
    );
  }

  const search = request.nextUrl.searchParams;
  const tags = search.getAll("tag");
  const path = search.get("path");

  if (tags.length > 0) {
    tags.forEach((tag) => revalidateTag(tag, "max"));
  }

  if (path) {
    revalidatePath(path);
  }

  return Response.json({
    ok: true,
    tags: tags.length > 0 ? tags : ["featured-listings", "listings"],
    path,
  });
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Revalidation is only available in development." },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({ tags: [], path: undefined }))) as {
    tags?: string[];
    path?: string;
  };
  const tags =
    Array.isArray(body.tags) && body.tags.length > 0
      ? body.tags
      : ["featured-listings", "listings"];

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  if (body.path) {
    revalidatePath(body.path);
  }

  return Response.json({ ok: true, tags, path: body.path ?? null });
}
