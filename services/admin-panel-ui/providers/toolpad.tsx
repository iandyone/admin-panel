"use client";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAppProvider } from "@toolpad/core/nextjs";
import { PropsWithChildren, Suspense } from "react";

import { navigation } from "@/constants";
import { theme } from "@/theme";

export const MaterialUIProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
        <Suspense>
        <NextAppProvider
          navigation={navigation}
          theme={theme}
          branding={{ title: "Admin Panel" }}
        >
          {children}
        </NextAppProvider>
    </Suspense>
      </AppRouterCacheProvider>
  );
};
