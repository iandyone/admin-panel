import { Stack, Typography } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { forbidden, unauthorized } from "next/navigation";
import { Suspense } from "react";

import { prefetchUsers } from "@/actions";
import { UsersTable } from "@/components/users-table";
import { auth } from "@/configs";
import {
  DEFAULT_ROWS_PER_PAGE,
  FetchTags,
  PAGES_ACCESSING_MAP,
  START_PAGE,
  USERS_DEFAULT_FILTER,
} from "@/constants";
import { EUserRoles } from "@/types";

export default async function Page() {
  const session = await auth();

  if (!session) {
    unauthorized();
  }

  const role = session?.user.role.toLowerCase() as EUserRoles;

  if (!PAGES_ACCESSING_MAP.users?.includes(role)) {
    forbidden();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      FetchTags.USERS,
      START_PAGE,
      DEFAULT_ROWS_PER_PAGE,
      USERS_DEFAULT_FILTER,
    ],
    queryFn: async () => await prefetchUsers(START_PAGE, DEFAULT_ROWS_PER_PAGE),
  });

  return (
    <Stack gap={3} sx={{ mt: 0 }}>
      <Typography component="h2" variant="h6">
        Users
      </Typography>

      <Suspense fallback="Fetching users data">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UsersTable />;
        </HydrationBoundary>
      </Suspense>
    </Stack>
  );
}
