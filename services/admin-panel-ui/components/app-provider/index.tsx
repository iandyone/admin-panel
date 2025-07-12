"use client";

import { NextAppProvider } from "@toolpad/core/nextjs";
import { PropsWithChildren } from "react";

import { navigation } from "@/constants";
import { theme } from "@/theme";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextAppProvider
      navigation={navigation}
      theme={theme}
      branding={{ title: "Admin Panel" }}
    >
      {children}
    </NextAppProvider>
  );
};
