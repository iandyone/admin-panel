"use client";

import {
  Button,
  TableCell,
  TableRow,
  TableRowProps,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";

import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { ConfirmRemoveModal, UpdateOrderForm, UpdateUserForm } from "@/forms";
import { CrossIcon, PenIcon } from "@/svg";
import { Order, User } from "@/types";
import { EUserStatuses } from "@/types/user";
import { isOrderData, isUserData } from "@/utils/guards";

interface Props extends TableRowProps {
  data: Order | User;
}

const { ACTIVE, INACTIVE } = EUserStatuses;

export const TableRowItem: FC<Props> = ({ data, ...rowProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "remove">("edit");
  const isOrderModal = isOrderData(data);
  const isUserModal = isUserData(data);
  const theme = useTheme();

  const handleOnClickEditButton = () => {
    setModalType("edit");
    setIsOpen(true);
  };

  const handleOnClickRemoveButton = () => {
    setModalType("remove");
    setIsOpen(true);
  };

  const handleOnCloseModal = () => {
    setIsOpen(false);
  };

  const handleOnConfirmRemoving = () => {};

  return (
    <TableRow hover {...rowProps}>
      {Object.entries(data).map(([key, value], index) => {
        const ceilValue =
          key === "isActive" ? (value ? ACTIVE : INACTIVE) : value;

        return (
          <TableCell
            size="small"
            key={index}
            sx={{ textTransform: "capitalize" }}
          >
            {ceilValue}
          </TableCell>
        );
      })}
      <TableCell size="small">
        <Button
          onClick={handleOnClickEditButton}
          variant="text"
          sx={{ width: "40px", minWidth: "auto" }}
        >
          <PenIcon stroke={theme.palette.text.secondary} />
        </Button>
      </TableCell>

      {isOrderModal && (
        <TableCell size="small">
          <Button
            onClick={handleOnClickRemoveButton}
            variant="text"
            sx={{ width: "40px", minWidth: "auto" }}
          >
            <CrossIcon stroke={theme.palette.text.secondary} />
          </Button>
        </TableCell>
      )}

      {modalType === "edit" && (
        <FormModalWrapper
          open={isOpen}
          onClose={handleOnCloseModal}
          title={`Update ${isOrderModal ? "order" : `user`} #${data.id}`}
        >
          {isOrderModal && (
            <UpdateOrderForm
              data={data}
              onCancel={handleOnCloseModal}
              onSubmit={handleOnCloseModal}
            />
          )}
          {isUserModal && (
            <UpdateUserForm
              data={data}
              onCancel={handleOnCloseModal}
              onSubmit={handleOnCloseModal}
            />
          )}
        </FormModalWrapper>
      )}
      {modalType === "remove" && (
        <FormModalWrapper
          open={isOpen}
          onClose={handleOnCloseModal}
          title={`Confirm to remove`}
          width="30vh"
        >
          <ConfirmRemoveModal
            message={`Do you really want to remove order #${data.id}?`}
            orderId={data.id}
            onConfirm={handleOnConfirmRemoving}
            handleOnClickControls={handleOnCloseModal}
          />
        </FormModalWrapper>
      )}
    </TableRow>
  );
};
