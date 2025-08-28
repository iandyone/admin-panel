"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { ERoutes } from "@/constants";

export const Authorized: FC = () => {
  const router = useRouter();

  const handleOnClickButton = () => {
    router.push(ERoutes.ORDERS);
  };

  return (
    <Stack gap={2} alignItems='center'>
      <Typography variant="h2">Authorizes</Typography>

      <Typography variant="h5">You are already logged in</Typography>

      <Button onClick={handleOnClickButton}>Go to main page</Button>
    </Stack>
  );
};
