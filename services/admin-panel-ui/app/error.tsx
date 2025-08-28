"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ERoutes } from '@/constants';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { replace } = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => replace(ERoutes.DASHBOARD)}>Go to main page</button>
    </div>
  );
}
