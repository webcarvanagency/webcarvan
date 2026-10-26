# Web Caravan agency

SEO-friendly agency website with a full admin panel, built with **Next.js (App Router, JavaScript)**, **Tailwind CSS**, **Firebase** (Firestore + Auth) and **Cloudinary**.

Every text, image, contact detail, service, project, testimonial and article is managed from the admin panel, which lives at a secret address you choose (`ADMIN_PATH`).

## Features

- Public pages: Home, Services (+ detail), Our Work (+ case study), About, Insights / blog (+ article), Contact
- SEO: per-page metadata, Open Graph / Twitter cards, canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD (Organization + BlogPosting)
- Pages are static and refresh automatically (every 60s, and instantly after saving in the admin panel)
- Admin panel (at `/<ADMIN_PATH>`, `/admin` returns 404): site settings (branding, hero, sections, about, process, CTA, contact, social, SEO), services, projects, testimonials, insights and contact-form messages
- Image uploads go straight to Cloudinary using a signed request (the API secret never reaches the browser)
- Starter content is shown until Firebase is connected and can be imported with one click from the dashboard

## Project structure

```
app/(site)/        public website pages
app/[admin]/       admin panel pages (served at the secret ADMIN_PATH)
app/api/           upload signature + revalidate routes
components/site/   website components
components/admin/  admin components and form fields
lib/defaults.js    starter content
lib/admin-config.js  admin form definitions (add a field here to manage it)
lib/data.js        reads website content from Firestore
firestore.rules    database security rules
```

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values.

3. **Firebase**
   - Create a project at https://console.firebase.google.com and add a **Web app** - copy its config into the env file.
   - **Build → Firestore Database**: create a database (production mode).
   - **Firestore → Rules**: paste `firestore.rules`, check the email allowlist in `isAdmin()` matches your admin email(s), then publish.
   - **Build → Authentication**: enable **Email/Password**, then add your admin user under **Users**.
   - Put the same email(s) in `NEXT_PUBLIC_ADMIN_EMAILS` (comma separated).

4. **Cloudinary**: copy the cloud name, API key and API secret from the Cloudinary dashboard into the env file.

5. Run the project

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000/<ADMIN_PATH>` (the value you set in the env file), sign in and click **Import Starter Content** on the dashboard. Then edit everything to your needs.

## Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Add every variable from `.env.example` under **Settings → Environment Variables** (set `NEXT_PUBLIC_SITE_URL` to your live domain).
3. Deploy. Add your Vercel domain to **Firebase → Authentication → Settings → Authorized domains**.

## Content tips

- Long text fields: separate paragraphs with an empty line; start a line with `## ` to make a heading.
- Slugs are generated from the title automatically when left empty.
- Unpublished items are saved as drafts and hidden from the website.
# webcarvan

## Firestore access rules

`firestore.rules` matches the existing website and admin panel:

| Data | Visitors and other signed-in users | Allowlisted admin |
| --- | --- | --- |
| `settings/site` | Read | Read and write |
| `services`, `projects`, `testimonials`, `posts` | Read | Read and write |
| `messages` | Create a valid enquiry only | Read, delete, and toggle `read` |
| All other paths | Denied | Denied |

Enquiries must contain exactly the seven fields sent by the contact form. Types,
lengths, email format, a positive integer millisecond `createdAt`, and initial
`read: false` are checked. Phone and service may be empty strings. These rules do
not provide spam rate limiting or prove that the supplied timestamp is accurate.

Content collections remain publicly readable because `lib/data.js` lists them
without authentication and filters drafts afterward. Drafts are hidden from the
rendered website, but are **not private in Firestore**. Do not store confidential
content in these collections. Image uploads use Cloudinary, not Firebase Storage.

Publish by pasting the file into the Firebase console for the same project as
`NEXT_PUBLIC_FIREBASE_PROJECT_ID`. Alternatively, with Firebase CLI installed and
signed in, run `firebase deploy --only firestore:rules --project YOUR_PROJECT_ID`.
`firebase.json` points the CLI to this rules file. Local file edits alone do not
update deployed Firebase rules. The admin allowlist in this file must match
`NEXT_PUBLIC_ADMIN_EMAILS`; that environment variable does not configure rules.
