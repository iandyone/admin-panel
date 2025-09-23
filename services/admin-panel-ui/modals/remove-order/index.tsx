"use client";

import { Stack, Typography } from "@mui/material";

import { FormControls } from "@/components/form-controls";
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

      <FormControls
        onClickApply={handleOnConfirmRemove}
        onClickReset={handleOnClickControls}
        applyLabel="Confirm"
        resetLabel="Cancel"
      />
    </Stack>
  );
};
