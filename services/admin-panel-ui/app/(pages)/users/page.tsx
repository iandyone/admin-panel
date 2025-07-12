import { Stack, Typography } from "@mui/material";

import { UsersTable } from "@/components/users-table";

export default function Page() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <Typography component="h2" variant="h6">
        Users
      </Typography>

      <UsersTable />
    </Stack>
  );
}
