import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/server-auth";

// Called by the admin panel after every save so the website updates instantly.
export async function POST(request) {
  const admin = await verifyAdmin(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true });
}
