"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { useSession } from "next-auth/react";
import { PropsWithChildren, Suspense } from "react";

import { navigation } from "@/constants";
import { theme } from "@/theme";

export const MaterialUIProvider = ({ children }: PropsWithChildren) => {
  const { data } = useSession();

  return (
    <AppRouterCacheProvider>
      <Suspense>
        <NextAppProvider
          navigation={navigation[data?.user.role || "delivery"]}
          theme={theme}
          branding={{ title: "Admin Panel" }}
        >
          {children}
        </NextAppProvider>
      </Suspense>
    </AppRouterCacheProvider>
  );
};
