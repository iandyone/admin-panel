import { Stack } from "@mui/material";

import { Authorization } from "@/components/authorization";
import { Authorized } from "@/components/ui/authorized";
import { auth } from "@/configs";

export default async function Page() {
  const session = await auth();

  if (session?.user.id) {
    return <Authorized />;
  }

  return (
    <Stack gap={3} sx={{ mt: 0, width: "100%", alignSelf: "center" }}>
      <Authorization />
    </Stack>
  );
}
