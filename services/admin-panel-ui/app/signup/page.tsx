import { Stack } from "@mui/material";

import { Authorization } from "@/components/authorization";

export default function Page() {
  return (
    <Stack gap={3} sx={{ mt: 0, width: "100%", alignSelf: 'center' }}>
      <Authorization />
    </Stack>
  );
}
