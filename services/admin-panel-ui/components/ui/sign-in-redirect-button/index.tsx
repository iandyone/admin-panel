"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
import { FC } from "react";

import { ERoutes } from "@/constants";

interface Props {
  title: string;
  redirectTo: ERoutes;
  withSignOut?: boolean;
}

export const RedirectButton: FC<Props> = ({ title, redirectTo, withSignOut }) => {
  const router = useRouter();

  const handleOnClick = () => {
    if (withSignOut) {
     signOut() 
    }
    router.replace(redirectTo);
  };

  return (
    <Button variant="contained" color="info" onClick={handleOnClick}>
      {title}
    </Button>
  );
};
