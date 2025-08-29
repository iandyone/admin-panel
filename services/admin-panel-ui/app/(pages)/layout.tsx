"use client";

import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DashboardLayout } from "@toolpad/core";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

import { SidebarFooter } from "@/components/sidebar-footer";

export default function PagesLayout({ children }: PropsWithChildren) {
  const session = useSession();

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
