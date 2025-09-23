import { Stack } from "@mui/material";
import { redirect, RedirectType } from 'next/navigation';

import { Authorization } from "@/components/authorization";
import { auth } from "@/configs";
import { ERoutes } from '@/constants';


export default async function Page() {
  const session = await auth();

  if (session?.user.id) {
    redirect(ERoutes.ORDERS, RedirectType.replace)
  }

  return (
    <Stack gap={3} sx={{ mt: 0, width: "100%", alignSelf: "center" }}>
      <Authorization />
    </Stack>
  );
}
