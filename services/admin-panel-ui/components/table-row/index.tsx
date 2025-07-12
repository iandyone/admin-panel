import { Button, TableCell, TableRow, TableRowProps } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

import { OrderData, UserData } from "@/types";

interface Props extends TableRowProps {
  data: OrderData | UserData;
}

export const TableRowItem: FC<Props> = ({ data, ...rowProps }) => {
  return (
    <TableRow hover {...rowProps}>
      {Object.values(data).map((item) => (
        <TableCell size="small" key={item}>
          {item}
        </TableCell>
      ))}
      <TableCell size="small">
        <Button variant="text" sx={{ width: "40px", minWidth: "auto" }}>
          <Image alt="edit-icon" src={"/pen.svg"} width={20} height={20} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
