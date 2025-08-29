import { DefaultUser } from "next-auth";

import { EUserRoles } from "./types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: number;
      email: string;
      role: EUserRoles;
      firstName: string;
      lastName: string;
      isActive: boolean;
    };
  }

  interface User extends DefaultUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: EUserRoles;
    accessToken?: string;
    accessTokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
    email: string;
    role: EUserRoles;
    firstName: string;
    lastName: string;
    isActive: boolean;
    accessToken?: string;
    accessTokenExpires?: number;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    xsl: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
