import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navigation } from "@toolpad/core";

export enum ERoutes {
  DASHBOARD = "dashboard",
  ORDERS = "orders",
  USERS = "users",
  AUTH = "auth",
}

export const FetchTags = {
  USERS: "users",
};

export const navigation: Navigation = [
  { title: "Dashboard", segment: ERoutes.DASHBOARD, icon: <DashboardIcon /> },
  { title: "Orders", segment: ERoutes.ORDERS, icon: <ShoppingCartIcon /> },
  { kind: "divider" },
  { title: "Users", segment: ERoutes.USERS, icon: <PersonIcon /> },
];
