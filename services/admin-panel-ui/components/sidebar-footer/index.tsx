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
import { FC, Fragment } from "react";

import { SignOutIcon } from "@/svg";

import { SkeletonLoader } from "../loaders/skeleton-loader";

export const SidebarFooter: FC<SidebarFooterProps> = ({ mini }) => {
  const session = useSession();
  const theme = useTheme();
  const router = useRouter();

  const firstName = session.data?.user.firstName || "";
  const lastName = session.data?.user.lastName || "";

  const handleOnClickSignOutButton = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  };
  const isLoading = session.status === "loading";

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
            {isLoading ? (
              <SkeletonLoader variant="circular" width={48} height={48} />
            ) : (
              <Typography
                fontSize={18}
                sx={{ color: theme.palette.common.white }}
              >
                {firstName[0].toUpperCase()}
              </Typography>
            )}
          </Stack>
        </Tooltip>

        {!mini && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack width={"100%"}>
              {isLoading ? (
                <Fragment>
                  <SkeletonLoader variant="text" />
                  <SkeletonLoader variant="text" />
                </Fragment>
              ) : (
                <Fragment>
                  <Tooltip
                    title={`${firstName} ${lastName}`}
                    placement="top"
                    slots={{
                      transition: Fade,
                    }}
                  >
                    <Typography maxWidth={181}>
                      {firstName} {lastName}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title={`${session.data?.user.email}`}
                    placement="top"
                    slots={{
                      transition: Fade,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textDisabled"
                      maxWidth={181}
                    >
                      {session.data?.user.email}
                    </Typography>
                  </Tooltip>
                </Fragment>
              )}
            </Stack>
            <Tooltip
              title="Sign out"
              slots={{
                transition: Fade,
              }}
            >
              {isLoading ? (
                <SkeletonLoader
                  variant="rounded"
                  width={42}
                  height={44}
                  sx={{ marginLeft: 2, bgcolor: "grey.200" }}
                />
              ) : (
                <Button
                  onClick={handleOnClickSignOutButton}
                  variant="text"
                  sx={{ width: "42px", minWidth: "auto" }}
                >
                  <SignOutIcon fill={theme.palette.primary.main} />
                </Button>
              )}
            </Tooltip>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
