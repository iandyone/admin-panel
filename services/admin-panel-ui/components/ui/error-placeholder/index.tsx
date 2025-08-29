import { Stack, Typography } from "@mui/material";
import { FC } from "react";

import { ERoutes } from "@/constants";

import { ErrorAnimation } from "../error-animation";
import { RedirectButton } from "../sign-in-redirect-button";

interface Props {
  title: string;
  subtitle: string;
  buttonText?: string;
  redirectTo?: ERoutes;
  withSignOut?: boolean;
}

export const ErrorPlaceholder: FC<Props> = ({
  title,
  subtitle,
  buttonText,
  redirectTo,
  withSignOut
}) => {
  return (
    <Stack
      gap={2}
      alignItems="center"
      margin={{ xs: 0, sm: 12 }}
      marginTop={{ xs: 8 }}
      padding={2}
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h4" textAlign="center">
        {title}
      </Typography>

      <ErrorAnimation />

      <Typography variant="h6" textAlign="center" maxWidth={500}>
        {subtitle}
      </Typography>


      {buttonText && redirectTo && (
        <RedirectButton title={buttonText} redirectTo={redirectTo} withSignOut={withSignOut} />
      )}
    </Stack>
  );
};
