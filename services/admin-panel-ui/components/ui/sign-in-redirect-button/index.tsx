"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { ERoutes } from "@/constants";

interface Props {
  title: string;
  redirectTo: ERoutes;
}

export const RedirectButton: FC<Props> = ({ title, redirectTo }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.replace(redirectTo);
  };

  return (
    <Button variant="contained" color="info" onClick={handleOnClick}>
      {title}
    </Button>
  );
};
