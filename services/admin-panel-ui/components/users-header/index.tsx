"use client";

import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";

import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { CreateUserForm } from '@/forms/create-user';

export const UsersHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClickAddButton = () => {
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography component="h2" variant="h6">
        Users
      </Typography>
      <Button
        variant="contained"
        color="warning"
        onClick={handleOnClickAddButton}
      >
        Add user
      </Button>
      <FormModalWrapper open={isOpen} onClose={onClose} title={`New user`}>
        <CreateUserForm onCancel={onClose} onSubmit={onClose}/>
      </FormModalWrapper>
    </Stack>
  );
};
