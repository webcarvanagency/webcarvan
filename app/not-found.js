import SiteLayout from "./(site)/layout";
import NotFound from "./(site)/not-found";

export const metadata = { title: "Page Not Found" };

export default function RootNotFound() {
  return (
    <SiteLayout>
      <NotFound />
    </SiteLayout>
  );
}
