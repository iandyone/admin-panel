"use client";

import { Card, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { ERoutes } from "@/constants";
// import { SignUpForm } from "@/forms";
import { SignInForm } from '@/forms/sign-in';

export const Authorization: FC = () => {
  const router = useRouter();

  const handleOnSubmit = () => {
    router.push(ERoutes.DASHBOARD);
  };

  return (
    <Stack alignItems="center" sx={{height: '100%'}}>
      <Card
        elevation={2}
        sx={{ p: 3, width: "100%", height: '100%', maxWidth: 600, bgcolor: "background.paper" }}
      >
        <Stack direction="column" spacing={2}>
          <Typography align="center" variant="h4">
            Sign Up
          </Typography>

          <SignInForm handleOnSubmit={handleOnSubmit} />
          {/* <SignUpForm handleOnSubmit={handleOnSubmit} /> */}
        </Stack>
      </Card>
    </Stack>
  );
};
