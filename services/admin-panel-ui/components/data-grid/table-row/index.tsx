"use client";

import { Button, TableCell, TableRow, TableRowProps } from "@mui/material";
import Image from "next/image";
import { FC, useState } from "react";

import { updateUserAction } from "@/actions";
import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { UpdateOrderForm } from "@/forms/update-order";
import { UpdateUserForm } from "@/forms/update-user";
import { ORDERS_DATA } from "@/mocks";
import { OrderData, User } from "@/types";
import { UpdateUserDto } from "@/types/user";
import { isOrderData, isUserData } from "@/utils/guards";

interface Props extends TableRowProps {
  data: OrderData | User;
}

export const TableRowItem: FC<Props> = ({ data, ...rowProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOrderModal = isOrderData(data);
  const isUserModal = isUserData(data);

  const orderItems = new Set([...ORDERS_DATA.map(({ order }) => order)]);

  const handleOnClickEditButton = () => {
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  const handleOnCancel = () => {
    // TODO: логика работы формы
    onClose();
  };
  const handleOnSubmit = () => {
    onClose();
  };

  const handleOnSubmitUpdateUser = (userData: UpdateUserDto) => {
    updateUserAction({ id: data.id, userData });
    onClose();
  };

  return (
    <TableRow hover {...rowProps}>
      {Object.values(data).map((item, index) => (
        <TableCell
          size="small"
          key={item?.id || index}
          sx={{ textTransform: "capitalize" }}
        >
          {item}
        </TableCell>
      ))}
      <TableCell size="small">
        <Button
          onClick={handleOnClickEditButton}
          variant="text"
          sx={{ width: "40px", minWidth: "auto" }}
        >
          <Image alt="edit-icon" src={"/pen.svg"} width={20} height={20} />
        </Button>
      </TableCell>

      <FormModalWrapper
        open={isOpen}
        onClose={onClose}
        title={`Update ${isOrderModal ? "order" : `user`} #${data.id}`}
      >
        {isOrderModal && (
          <UpdateOrderForm
            data={data}
            onCancel={handleOnCancel}
            onSubmit={handleOnSubmit}
            orderItems={Array.from(orderItems)}
          />
        )}
        {isUserModal && (
          <UpdateUserForm
            data={data}
            onCancel={handleOnCancel}
            onSubmit={handleOnSubmitUpdateUser}
          />
        )}
      </FormModalWrapper>
    </TableRow>
  );
};
