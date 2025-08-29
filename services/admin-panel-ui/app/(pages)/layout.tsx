"use client";

import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DashboardLayout } from "@toolpad/core";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";

import { SidebarFooter } from "@/components/sidebar-footer";

export default function PagesLayout({ children }: PropsWithChildren) {
  const session = useSession();

  useEffect(() => {
    if (session.data?.user.isActive === false) {
      signOut({ redirect: false });
      redirect("/deactivated");
    }
  }, [session]);

  return (
    <DashboardLayout
      defaultSidebarCollapsed
      hideNavigation={!session.data}
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
