"use client";

import { Stack, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FC, ReactNode } from "react";

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

export const FormModalWrapper: FC<Props> = ({
  open,
  onClose,
  title,
  width = "40vw",
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        spacing={3}
        sx={{
          bgcolor: "background.paper",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 3,
          width,
          minWidth: 400,
        }}
      >
        <Typography variant="h5">{title}</Typography>
        {children}
      </Stack>
    </Modal>
  );
};
