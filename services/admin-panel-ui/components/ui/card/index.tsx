import { Card as CardWrapper, CardContent } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CardWrapper elevation={2} sx={{ width: "100%" }} square={false}>
      <CardContent sx={{ pb: 1 }}>{children}</CardContent>
    </CardWrapper>
  );
};
