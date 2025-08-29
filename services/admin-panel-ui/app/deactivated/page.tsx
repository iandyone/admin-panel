import { ErrorPlaceholder } from "@/components/ui/error-placeholder";
import { ERoutes } from "@/constants";

export default function Page() {
  return (
    <ErrorPlaceholder
      title="Deactivated"
      subtitle="Your account has been deactivated. Contact your manager or administrator"
      buttonText="Sign out"
      redirectTo={ERoutes.SIGN_IN}
    />
  );
}
