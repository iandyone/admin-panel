import { Card, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { SignInForm } from "@/forms";

export const Authorization: FC = () => {
  return (
    <Stack alignItems="center" sx={{ height: "100%" }}>
      <Card
        elevation={2}
        sx={{
          p: 3,
          width: "100%",
          height: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography align="center" variant="h4">
            Sign In
          </Typography>

          <SignInForm />
        </Stack>
      </Card>
    </Stack>
  );
};
