"use client";

import {
  Button,
  TableCell,
  TableRow,
  TableRowProps,
  useTheme,
} from "@mui/material";
import { FC, useMemo, useState } from "react";

import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { EPermissions } from "@/constants";
import { ConfirmRemoveModal, UpdateOrderForm, UpdateUserForm } from "@/forms";
import { usePermissions } from "@/hooks";
import { CrossIcon, PenIcon } from "@/svg";
import { Order, User } from "@/types";
import { EUserRoles, EUserStatuses } from "@/types/user";
import { isOrderData, isUserData } from "@/utils/guards";

interface Props extends TableRowProps {
  data: Order | User;
}

const { ACTIVE, INACTIVE } = EUserStatuses;
const { ADMIN } = EUserRoles;
const { EDIT_USER, REMOVE_ORDER } = EPermissions;

export const TableRowItem: FC<Props> = ({ data, ...rowProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "remove">("edit");
  const { role, checkPermission } = usePermissions();

  const isOrderTable = isOrderData(data);
  const isUserTable = isUserData(data);

  const theme = useTheme();

  const editUserPermission = useMemo(
    () =>
      isUserTable &&
      (role === ADMIN || (checkPermission(EDIT_USER) && data.role !== ADMIN)),
    [checkPermission, isUserTable, role, data],
  );

  const disableEditButton = isUserTable ? !editUserPermission : false;

  const showRemoveButton = isOrderTable && checkPermission(REMOVE_ORDER);

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
          <TableCell size="small" key={index}>
            {ceilValue}
          </TableCell>
        );
      })}

      <TableCell size="small">
        <Button
          onClick={handleOnClickEditButton}
          disabled={disableEditButton}
          variant="text"
          sx={{ width: "40px", minWidth: "auto" }}
        >
          <PenIcon
            stroke={
              disableEditButton
                ? theme.palette.text.disabled
                : theme.palette.text.secondary
            }
          />
        </Button>
      </TableCell>

      {showRemoveButton && (
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
          title={`Update ${isOrderTable ? "order" : `user`} #${data.id}`}
        >
          {isOrderTable && (
            <UpdateOrderForm
              data={data}
              onCancel={handleOnCloseModal}
              onSubmit={handleOnCloseModal}
            />
          )}
          {isUserTable && (
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
