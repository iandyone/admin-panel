import {
  AlertProps,
  AlertTitle,
  Alert as MuiAlert,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface Props {
  severity: AlertProps["severity"];
  title: string;
  message: string;
}

export const Alert: FC<Props> = ({ severity = "success", message, title }) => {
  return (
    <MuiAlert severity={severity} sx={{ width: "100%" }} variant='standard'>
      {title && (
        <AlertTitle>
          <Typography fontWeight='bold'>{title}</Typography>
        </AlertTitle>
      )}
      <Typography>{message}</Typography>
    </MuiAlert>
  );
};
