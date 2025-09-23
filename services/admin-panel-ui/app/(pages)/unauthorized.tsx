import { ErrorPlaceholder } from "@/components/ui/error-placeholder";
import { ERoutes } from "@/constants";

export default function Unauthorized() {
  return (
    <ErrorPlaceholder
      title="Not authorized"
      subtitle="You are not authorized. Please, sign in and try again"
      buttonText="Sign in"
      redirectTo={ERoutes.SIGN_IN}
    />
  );
}
