"use client";

import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DashboardLayout } from "@toolpad/core";
import { redirect } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect, useLayoutEffect } from "react";

import { SidebarFooter } from "@/components/sidebar-footer";
import { $axios } from "@/configs";
import { ERoutes } from "@/constants";

const { SIGN_IN, DEACTIVATED } = ERoutes;

export default function PagesLayout({ children }: PropsWithChildren) {
  const session = useSession();
  const hideNavigation = !session.data && session.status !== "loading";

  useEffect(() => {
    if (session.data?.user.isActive === false) {
      signOut({ redirect: false });
      redirect(DEACTIVATED);
    }
  }, [session]);

  useLayoutEffect(() => {
    $axios.interceptors.request.use((config) => {
      const token = session.data?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    $axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error?.response?.status === 401) {
          await signOut({ redirectTo: `/${SIGN_IN}` });
        }

        return Promise.reject(error);
      },
    );
  }, [session.data?.accessToken]);

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
