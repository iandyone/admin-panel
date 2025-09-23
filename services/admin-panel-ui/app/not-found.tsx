import { ErrorPlaceholder } from "@/components/ui/error-placeholder";
import { ERoutes } from "@/constants";

export default function NotFound() {
  return (
    <ErrorPlaceholder
      title="Page not found"
      subtitle="Could not find requested resource"
      buttonText="Go to the main page"
      redirectTo={ERoutes.ORDERS}
    />
  );
}
