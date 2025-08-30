"use client";

import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";

import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { EPermissions } from "@/constants";
import { CreateOrderForm } from "@/forms";
import { usePermissions } from "@/hooks";

export const OrdersHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { checkPermission } = usePermissions();

  const handleOnClickAddButton = () => {
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography component="h2" variant="h6">
        Orders
      </Typography>

      {checkPermission(EPermissions.ADD_ORDER_BUTTON) && (
        <Button
          variant="contained"
          color="warning"
          onClick={handleOnClickAddButton}
        >
          Add order
        </Button>
      )}

      <FormModalWrapper open={isOpen} onClose={onClose} title={`New order`}>
        <CreateOrderForm onCancel={onClose} onSubmit={onClose} />
      </FormModalWrapper>
    </Stack>
  );
};
