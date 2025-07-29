"use client";

import { Button, TableCell, TableRow, TableRowProps } from "@mui/material";
import Image from "next/image";
import { FC, useState } from "react";

import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { EditOrderForm } from "@/forms/edit-order";
import { EditUserForm } from "@/forms/edit-user";
import { ORDERS_DATA } from "@/mocks";
import { OrderData, UserData } from "@/types";
import { isOrderData, isUserData } from "@/utils/guards";

interface Props extends TableRowProps {
  data: OrderData | UserData;
}

export const TableRowItem: FC<Props> = ({ data, ...rowProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: получить список доступных для заказа блюд
  const orderItems = new Set([...ORDERS_DATA.map(({ order }) => order)]);

  const isOrderModal = isOrderData(data);
  const isUserModal = isUserData(data);

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

  return (
    <TableRow hover {...rowProps}>
      {Object.values(data).map((item) => (
        <TableCell size="small" key={item}>
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
          <EditOrderForm
            data={data}
            onCancel={handleOnCancel}
            onSubmit={handleOnSubmit}
            orderItems={Array.from(orderItems)}
          />
        )}
        {isUserModal && (
          <EditUserForm
            data={data}
            onCancel={handleOnCancel}
            onSubmit={handleOnSubmit}
          />
        )}
      </FormModalWrapper>
    </TableRow>
  );
};
