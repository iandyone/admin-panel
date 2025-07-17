"use client";

import { NextAppProvider } from "@toolpad/core/nextjs";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { store } from "@/config";
import { navigation } from "@/constants";
import { theme } from "@/theme";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextAppProvider
      navigation={navigation}
      theme={theme}
      branding={{ title: "Admin Panel" }}
    >
      <Provider store={store}>{children}</Provider>
    </NextAppProvider>
  );
};
