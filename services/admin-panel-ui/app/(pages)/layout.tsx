"use client";

import { Container } from "@mui/material";
import { DashboardLayout } from "@toolpad/core";
import { PropsWithChildren } from "react";

export default function PagesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <DashboardLayout defaultSidebarCollapsed>
        <Container maxWidth={false} sx={{ pt: 2, pb: 2, height: "100%" }}>
          {children}
        </Container>
      </DashboardLayout>
    </div>
  );
}
