"use client";

import { Button, TableCell, TableRow, TableRowProps } from "@mui/material";
import Image from "next/image";
import { FC, useState } from "react";

import { FormModalWrapper } from "@/components/form-modal-wrapper";
import { UpdateOrderForm } from "@/forms/update-order";
import { UpdateUserForm } from "@/forms/update-user";
import { ORDERS_DATA } from "@/mocks";
import { OrderData, User } from "@/types";
import { EUserStatuses } from "@/types/user";
import { isOrderData, isUserData } from "@/utils/guards";

interface Props extends TableRowProps {
  data: OrderData | User;
}

const { ACTIVE, INACTIVE } = EUserStatuses;

export const TableRowItem: FC<Props> = ({ data, ...rowProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOrderModal = isOrderData(data);
  const isUserModal = isUserData(data);

  const orderItems = new Set([...ORDERS_DATA.map(({ order }) => order)]);

  const handleOnClickEditButton = () => {
    setIsOpen(true);
  };

  const handleOnCloseModal = () => {
    setIsOpen(false);
  };

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
          <Image alt="edit-icon" src={"/pen.svg"} width={20} height={20} />
        </Button>
      </TableCell>

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
            orderItems={Array.from(orderItems)}
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
    </TableRow>
  );
};
