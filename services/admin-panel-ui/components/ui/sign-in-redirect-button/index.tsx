"use client";

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from "react";

import { ERoutes } from '@/constants';

export const SignInRedirectButton: FC = () => {
  const router = useRouter()
  
  const handleOnClick = () => {
    router.replace(ERoutes.SIGN_IN)
  };

  return <Button variant='outlined' onClick={handleOnClick}>Go to sign in page</Button>;
};
