"use client";

import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DashboardLayout } from "@toolpad/core";
import { PropsWithChildren } from "react";

export default function PagesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <DashboardLayout defaultSidebarCollapsed>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Container maxWidth={false} sx={{ pt: 2, pb: 2, height: "100%" }}>
            {children}
          </Container>
        </LocalizationProvider>
      </DashboardLayout>
    </div>
  );
}
