import { ErrorPlaceholder } from "@/components/ui/error-placeholder";
import { ERoutes } from "@/constants";

export default function Unauthorized() {
  return (
    <ErrorPlaceholder
      title="Access denied"
      subtitle="You have no permissions for this page"
      buttonText="Go to the main page"
      redirectTo={ERoutes.ORDERS}
    />
  );
}
