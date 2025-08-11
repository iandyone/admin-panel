"use client";

import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";

import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { CreateOrderForm } from "@/forms";

export const OrdersHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClickAddButton = () => {
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography component="h2" variant="h6">
        Orders
      </Typography>
      <Button
        variant="contained"
        color="warning"
        onClick={handleOnClickAddButton}
      >
        Add order
      </Button>
      <FormModalWrapper open={isOpen} onClose={onClose} title={`Add new order`}>
        <CreateOrderForm onCancel={onClose} onSubmit={onClose} />
      </FormModalWrapper>
    </Stack>
  );
};
