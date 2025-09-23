import { Button, Stack } from "@mui/material";
import { FC } from "react";

interface Props {
  onClickApply?: () => void;
  onClickReset: () => void;
  applyLabel?: string;
  resetLabel?: string;
  disabled?: boolean;
}

export const FormControls: FC<Props> = ({
  onClickApply,
  onClickReset,
  disabled,
  applyLabel = "Apply",
  resetLabel = "Reset",
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Button
        type="reset"
        disabled={disabled}
        variant="contained"
        color="info"
        onClick={onClickReset}
        size="small"
        sx={{ width: 80 }}
      >
        {resetLabel}
      </Button>
      <Button
        disabled={disabled}
        type="submit"
        variant="contained"
        color="warning"
        size="small"
        onClick={onClickApply}
        sx={{ width: 80 }}
      >
        {applyLabel}
      </Button>
    </Stack>
  );
};
