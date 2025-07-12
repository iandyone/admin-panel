import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Box style={{ height: "100vh", alignContent: "center" }}>
      {children}
    </Box>
  );
}
