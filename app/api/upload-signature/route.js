import crypto from "node:crypto";
import { verifyAdmin } from "@/lib/server-auth";

// Returns a signed Cloudinary upload request so images can be uploaded
// directly from the admin panel without exposing the API secret.
export async function POST(request) {
  const admin = await verifyAdmin(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error("upload-signature: Cloudinary environment variables are missing");
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }

  const folder = process.env.CLOUDINARY_FOLDER || "webcaravan";
  const timestamp = Math.round(Date.now() / 1000);
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
    .digest("hex");

  return Response.json({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    folder,
    timestamp,
    signature,
  });
}
