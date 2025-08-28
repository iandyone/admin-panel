import { ErrorPlaceholder } from "@/components/ui/error-placeholder";
import { ERoutes } from "@/constants";

export default function Unauthorized() {
  return (
    <ErrorPlaceholder
      title="You are not authorized"
      subtitle="Please, sign in and try again"
      buttonText="Go to the sign in page"
      redirectTo={ERoutes.SIGN_IN}
    />
  );
}
