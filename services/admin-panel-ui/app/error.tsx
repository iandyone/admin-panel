"use client";
import { FC, useEffect } from "react";

import { ErrorPlaceholder } from "@/components/ui/error-placeholder";
import { ERoutes } from "@/constants";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FC<Props> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPlaceholder
      title="Something went wrong"
      subtitle="Please, try again latter"
      buttonText="Go to the main page"
      redirectTo={ERoutes.ORDERS}
    />
  );
};

export default Error;
