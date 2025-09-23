import { Stack } from "@mui/material";

import { TableLoader } from "@/components/loaders/table-loader";
import { UsersHeader } from "@/components/users-header";

export default function Loading() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <UsersHeader />
      <TableLoader />
    </Stack>
  );
}
