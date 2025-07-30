import { Stack, Typography } from "@mui/material";
import { Suspense } from "react";

import { getUsers } from '@/actions';
import { UsersTable } from "@/components/users-table";

const TableWrapper = async () => {
  const users = await getUsers();

  return <UsersTable users={users} />;
};

export default async function Page() {
  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <Typography component="h2" variant="h6">
        Users
      </Typography>

      <Suspense fallback="Fetching users data">
        <TableWrapper />
      </Suspense>
    </Stack>
  );
}
