"use client";

import { Button, Stack, Typography } from "@mui/material";

import { useRemoveOrderMutation } from "@/query";

interface Props {
  message: string;
  orderId: number;
  handleOnClickControls: () => void;
  onConfirm: () => void;
}

export const ConfirmRemoveModal = ({
  message,
  handleOnClickControls,
  orderId,
}: Props) => {
  const { mutateAsync: removeOrder } = useRemoveOrderMutation();

  const handleOnConfirmRemove = async () => {
    await removeOrder(orderId);

    handleOnClickControls();
  };

  return (
    <Stack direction="column" spacing={4}>
      <Typography>{message}</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Button
          type="reset"
          variant="contained"
          color="info"
          onClick={handleOnClickControls}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="warning"
          onClick={handleOnConfirmRemove}
          sx={{ minWidth: 100 }}
        >
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
};
