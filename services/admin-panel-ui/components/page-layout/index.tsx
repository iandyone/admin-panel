"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Container } from "@mui/material";
import { DashboardLayout, Navigation } from "@toolpad/core";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { PropsWithChildren } from "react";

import { theme } from "@/theme";

const navigation: Navigation = [
  { title: "Dashboard", segment: "dashboard", icon: <DashboardIcon /> },
  { title: "Orders", segment: "orders", icon: <ShoppingCartIcon /> },
  { kind: "divider" },
  { title: "Users", segment: "users", icon: <PersonIcon /> },
];

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <NextAppProvider
      navigation={navigation}
      theme={theme}
      branding={{ title: "Admin Panel" }}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <Container maxWidth={false} sx={{ pt: 2, pb: 2, height: '100%' }}>
          {children}
        </Container>
      </DashboardLayout>
    </NextAppProvider>
  );
};
