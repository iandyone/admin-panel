import {
  Button,
  MenuItem,
  TableCell,
  TableRow,
  TableRowProps,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import moment from "moment";
import Image from "next/image";
import { FC, useState } from "react";

import { OrderData } from "@/types";
import { EOrderStatuses } from "@/types/orders";

interface Props extends TableRowProps {
  orderData: OrderData;
}

export const OrdersTableRow: FC<Props> = ({
  orderData: { customer, date, id, location, price, status, manager, order },
  ...rowProps
}) => {
  const [currentStatus, setStatus] = useState(status);

  const handleOnChangeStatus = ({ target: { value } }: SelectChangeEvent) => {
    setStatus(value);
  };

  return (
    <TableRow {...rowProps}>
      <TableCell size="small">{id}</TableCell>
      <TableCell size="small">{order}</TableCell>
      <TableCell size="small">${price}</TableCell>
      <TableCell size="small">{customer}</TableCell>
      <TableCell size="small">{location}</TableCell>
      <TableCell size="small">{moment(date).format("L")}</TableCell>
      <TableCell size="small">{manager}</TableCell>
      <TableCell size="small">
        <Select
          value={currentStatus}
          onChange={handleOnChangeStatus}
          size="small"
          variant="standard"
          sx={{ width: "100%" }}
        >
          {Object.values(EOrderStatuses).map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </TableCell>
      <TableCell size="small">
        <Button variant="text" sx={{ width: "40px", minWidth: "auto" }}>
          <Image alt="edit-icon" src={"/pen.svg"} width={20} height={20}/>
        </Button>
      </TableCell>
    </TableRow>
  );
};
