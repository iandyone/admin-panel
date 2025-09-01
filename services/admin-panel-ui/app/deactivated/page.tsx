import { redirect } from "next/navigation";

import { ErrorPlaceholder } from "@/components/ui/error-placeholder";
import { auth } from "@/configs";
import { ERoutes } from "@/constants";

const { SIGN_IN, ORDERS } = ERoutes;

export default async function Page() {
  const session = await auth();

  if (session?.user.isActive) {
    redirect(ORDERS);
  }

  return (
    <ErrorPlaceholder
      title="Deactivated"
      subtitle="Your account has been deactivated. Contact your manager or administrator"
      buttonText="Sign out"
      redirectTo={SIGN_IN}
    />
  );
}
