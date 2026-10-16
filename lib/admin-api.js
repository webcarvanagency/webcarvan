import { auth } from "./firebase";

async function authHeaders() {
  const token = auth?.currentUser ? await auth.currentUser.getIdToken() : "";
  return { Authorization: `Bearer ${token}` };
}

export function isAdminEmail(email) {
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email) && admins.includes(email.toLowerCase());
}

// Refresh the public website so changes appear immediately.
export async function publishChanges() {
  try {
    await fetch("/api/revalidate", { method: "POST", headers: await authHeaders() });
  } catch (error) {
    console.error("publishChanges:", error);
  }
}

// Upload an image to Cloudinary and return its URL.
export async function uploadImage(file) {
  const signResponse = await fetch("/api/upload-signature", { method: "POST", headers: await authHeaders() });
  const sign = await signResponse.json();
  if (!signResponse.ok) throw new Error(sign.error || "Could not prepare the upload");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sign.apiKey);
  formData.append("timestamp", sign.timestamp);
  formData.append("signature", sign.signature);
  formData.append("folder", sign.folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Upload failed");
  return data.secure_url;
}
