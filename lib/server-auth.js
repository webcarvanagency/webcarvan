// Checks the Firebase ID token sent by the admin panel and makes sure
// the signed-in user is one of the admin emails.
export async function verifyAdmin(request) {
  const token = (request.headers.get("authorization") || "").replace("Bearer ", "");
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!token || !apiKey) return null;

  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: token }),
    cache: "no-store",
  });
  if (!response.ok) return null;

  const data = await response.json();
  const email = data.users?.[0]?.email?.toLowerCase();
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return email && admins.includes(email) ? email : null;
}
