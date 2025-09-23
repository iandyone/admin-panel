import { Stack, Typography } from "@mui/material";

import { DashboardLoader } from "@/components/loaders/dashboard-loader";

export default function Loading() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <Typography component="h2" variant="h6">
        Overview
      </Typography>
      <DashboardLoader />
    </Stack>
  );
}
