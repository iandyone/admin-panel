import {
  Button,
  TableCell,
  TableRow,
  TableRowProps,
} from "@mui/material";
import Image from "next/image";
import { FC } from "react";

import { OrderData, UserData } from "@/types";

interface Props extends TableRowProps {
  data: OrderData | UserData;
}

export const TableRowItem: FC<Props> = ({ data, ...rowProps }) => {
  // const [currentStatus, setStatus] = useState(status);

  // const handleOnChangeStatus = ({ target: { value } }: SelectChangeEvent) => {
  //   setStatus(value);
  // };

  console.group();
  console.log(Object.values(data));
  console.groupEnd();

  return (
    <TableRow hover {...rowProps}>
      {Object.values(data).map((item) => (
        <TableCell size="small" key={item}>
          {item}
        </TableCell>
      ))}
      {/* <TableCell size="small">{id}</TableCell>
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
      </TableCell> */}
      <TableCell size="small">
        <Button variant="text" sx={{ width: "40px", minWidth: "auto" }}>
          <Image alt="edit-icon" src={"/pen.svg"} width={20} height={20} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
