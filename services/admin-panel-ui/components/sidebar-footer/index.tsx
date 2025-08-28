"use client";

import {
  Button,
  Divider,
  Fade,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { SidebarFooterProps } from "@toolpad/core";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

import { SignOutIcon } from "@/svg";

export const SidebarFooter: FC<SidebarFooterProps> = ({ mini }) => {
  const session = useSession();
  const theme = useTheme();
  const router = useRouter();

  const firstName = session.data?.user.firstName || "";
  const lastName = session.data?.user.lastName || "";

  const handleOnClickSignOutButton = async () => {
    await signOut({ redirect: false });
    router.replace("/signin");
  };

  return (
    <Stack padding={2} gap={1}>
      <Divider />
      <Stack direction="row" gap={2}>
        <Tooltip
          title={`${firstName} ${lastName}`}
          placement="top-end"
          slots={{
            transition: Fade,
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            alignSelf="center"
            sx={{
              width: 48,
              height: 48,
              minWidth: 48,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.dark,
            }}
          >
            <Typography
              fontSize={18}
              sx={{ color: theme.palette.common.white }}
            >
              {firstName[0].toUpperCase()}
            </Typography>
          </Stack>
        </Tooltip>

        {!mini && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack>
              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography variant="subtitle2" color="textDisabled">
                {session.data?.user.email}
              </Typography>
            </Stack>
            <Tooltip
              title="Sign out"
              slots={{
                transition: Fade,
              }}
            >
              <Button
                onClick={handleOnClickSignOutButton}
                variant="text"
                sx={{ width: "42px", minWidth: "auto" }}
              >
                <SignOutIcon fill={theme.palette.primary.main} />
              </Button>
            </Tooltip>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
