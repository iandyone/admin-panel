"use client";

import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DashboardLayout } from "@toolpad/core";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect, useLayoutEffect } from "react";

import { SidebarFooter } from "@/components/sidebar-footer";
import { $axios } from "@/configs";

export default function PagesLayout({ children }: PropsWithChildren) {
  const session = useSession();
  const hideNavigation = !session.data && session.status !== "loading";

  useEffect(() => {
    if (session.data?.user.isActive === false) {
      signOut({ redirect: false });
      redirect("/deactivated");
    }
  }, [session]);

  useLayoutEffect(() => {
    const accessToken = session.data?.accessToken;

    if (session.data?.accessToken) {
      $axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
      });
    } else {
      $axios.interceptors.request.clear();
    }

    return () => $axios.interceptors.request.clear();
  }, [session.data]);

  return (
    <DashboardLayout
      defaultSidebarCollapsed
      hideNavigation={hideNavigation}
      slots={{
        sidebarFooter: SidebarFooter,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container maxWidth={false} sx={{ pt: 2, pb: 2 }}>
          {children}
        </Container>
      </LocalizationProvider>
    </DashboardLayout>
  );
}
