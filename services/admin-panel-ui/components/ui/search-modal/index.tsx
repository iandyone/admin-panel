import {
  Button,
  Stack,
  StandardTextFieldProps,
  TextField,
} from "@mui/material";
import { FC } from "react";

interface Props {
  label: string;
  value?: string;
  onChange?: StandardTextFieldProps["onChange"];
  onApply?: () => void;
  onReset?: () => void;
}

export const SearchModal: FC<Props> = ({
  label,
  value,
  onChange,
  onApply,
  onReset,
}) => {
  return (
    <Stack sx={{ p: 1, width: 250 }} spacing={2}>
      <TextField
        id="outlined-basic"
        size="small"
        label={`Search by ${label}`}
        variant="outlined"
        value={value}
        onChange={onChange}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={onApply}
          sx={{ width: 80 }}
        >
          Apply
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={onReset}
          size="small"
          sx={{ width: 80 }}
        >
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};
