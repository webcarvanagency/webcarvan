# Web Caravan AdSense setup

Publisher: `ca-pub-7174653597500061`. Verification is served at `/ads.txt`.

## Completed in code

- Six source-backed guides. Unchanged Firestore starter text is upgraded; custom
  saved copy and draft status remain authoritative. Guides can be edited normally
  in the Insights admin panel. Deleting a bundled guide unpublishes it, preventing
  the source copy from reappearing publicly.
- Privacy and editorial policies linked from the footer.
- One responsive manual display placement, mounted only by the Insights layout.
- A nonce-based CSP for Insights with per-request rendering. Other routes retain
  their existing policy. Analytics uses Next Script to inherit the current nonce.
- No fake slot ID or automatic approval flag. Ad requests remain off by default.

## After Google approval

1. Confirm AdSense shows **Ready** for `webcarvan.com`.
2. In **Ads → By ad unit**, create a responsive Display ad unit. Copy its numeric
   `data-ad-slot`. Leave **Auto ads OFF**: manual placements enforce the requested
   blog-only scope.
3. Configure **Privacy & messaging**, set the privacy URL to
   `https://webcarvan.com/privacy-policy`, and publish the Google-certified consent
   messages needed for your visitors. Google's AdSense tag integrates the message;
   this project does not substitute a homemade consent dialog.
4. In the website admin **Settings → Blog Advertising**, confirm Google approval
   and completed consent setup, paste the real ad unit ID, and enable blog ads.
   Save to refresh the public settings cache.
5. Check an article, the listing, and a navigation from an article to Contact.
   Only the listing and individual articles should contain an ad placement.
   Do not click your own ads or generate artificial traffic to test earnings.

Google account approval, ad availability and earnings cannot be granted by code.
The policy switches record the operator's confirmed setup; they do not query or
override Google's account status. If approval is withdrawn, switch ads off.

## Validation

Run `node --experimental-default-type=module --test tests/monetization.test.mjs`,
`npm run lint` and `npm run build`. Inspect the live privacy page, six article URLs,
the blog nonce header and the unchanged non-blog policy before resubmission.
