//TODO: make a layout

import { SignInRedirectButton } from "@/components/ui/sign-in-redirect-button";

export default function Unauthorized() {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page</p>
      <SignInRedirectButton />
    </main>
  );
}
