import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navigation } from "@toolpad/core";

import { EUserRoles } from "@/types";

const { ADMIN, DELIVERY, MANAGER } = EUserRoles;

export enum ERoutes {
  DASHBOARD = "dashboard",
  ORDERS = "orders",
  USERS = "users",
  SIGN_IN = "signin",
  DEACTIVATED = "deactivated",
}

export const navigation: Record<EUserRoles, Navigation> = {
  admin: [
    { title: "Dashboard", segment: ERoutes.DASHBOARD, icon: <DashboardIcon /> },
    { title: "Orders", segment: ERoutes.ORDERS, icon: <ShoppingCartIcon /> },
    { kind: "divider" },
    { title: "Users", segment: ERoutes.USERS, icon: <PersonIcon /> },
  ],
  manager: [
    { title: "Dashboard", segment: ERoutes.DASHBOARD, icon: <DashboardIcon /> },
    { title: "Orders", segment: ERoutes.ORDERS, icon: <ShoppingCartIcon /> },
    { kind: "divider" },
    { title: "Users", segment: ERoutes.USERS, icon: <PersonIcon /> },
  ],
  delivery: [
    { title: "Orders", segment: ERoutes.ORDERS, icon: <ShoppingCartIcon /> },
  ],
};

export const PAGES_ACCESSING_MAP: Record<ERoutes, EUserRoles[] | null> = {
  dashboard: [ADMIN, MANAGER],
  orders: [ADMIN, MANAGER, DELIVERY],
  users: [ADMIN, MANAGER],
  signin: null,
  deactivated: null,
};
