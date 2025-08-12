import { Stack } from "@mui/material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { FC, useCallback, useState } from "react";

import { FormControls } from "@/components/form-controls";
import { PeriodFilter } from "@/components/period-filter";
import { useAppSearchParams } from "@/hooks";

export interface AutocompleteProps {
  dataKey: string;
  title: string;
  setIsActive: (flag: boolean) => void;
  onClickControls: () => void;
  options: string[];
}

const searchKeyPrefixes: Record<string, string> = {
  createdAt: "Created",
  updatedAt: "Updated",
};

export const DateSearchModal: FC<AutocompleteProps> = ({
  dataKey,
  onClickControls,
  setIsActive,
}) => {
  const searchKeyPrefix = searchKeyPrefixes[dataKey] || "";
  const dateToKey = `dateTo${searchKeyPrefix}`;
  const dateFromKey = `dateFrom${searchKeyPrefix}`;

  const { setSearchParam, updateUrlWithSearchParams, searchParams } =
    useAppSearchParams();

  const [valueTo, setValueTo] = useState<number | null>(
    Number(searchParams.get(dateToKey)) || null,
  );
  
  const [valueFrom, setValueFrom] = useState<number | null>(
    Number(searchParams.get(dateFromKey)) || null,
  );

  const handleOnChangeDateFrom = (value: PickerValue) => {
    setValueFrom(value ? value?.valueOf() : null);
  };

  const handleOnChangeDateTo = (value: PickerValue) => {
    setValueTo(value ? value?.valueOf() : null);
  };

  const handleOnClickApplyButton = useCallback(() => {
    setSearchParam(dateToKey, valueTo ? valueTo.toString() : "");
    setSearchParam(dateFromKey, valueFrom ? valueFrom.toString() : "");

    updateUrlWithSearchParams();
    setIsActive(Boolean(valueFrom) || Boolean(valueTo));
    onClickControls();
  }, [
    valueTo,
    valueFrom,
    dateFromKey,
    dateToKey,
    onClickControls,
    setSearchParam,
    setIsActive,
    updateUrlWithSearchParams,
  ]);

  const handleOnClickResetButton = useCallback(() => {
    setValueFrom(null);
    setValueTo(null);
    setSearchParam(dateToKey, "");
    setSearchParam(dateFromKey, "");

    updateUrlWithSearchParams();
    setIsActive(false);
    onClickControls();
  }, [
    dateFromKey,
    dateToKey,
    onClickControls,
    setSearchParam,
    setIsActive,
    updateUrlWithSearchParams,
  ]);

  return (
    <>
      <Stack sx={{ p: 1, width: 250 }} spacing={2}>
        <PeriodFilter
          containerProps={{
            spacing: 2,
            columns: 1,
          }}
          valueTo={valueTo || ""}
          valueFrom={valueFrom || ""}
          onChangeDateFrom={handleOnChangeDateFrom}
          onChangeDateTo={handleOnChangeDateTo}
        />

        <FormControls
          onClickApply={handleOnClickApplyButton}
          onClickReset={handleOnClickResetButton}
        />
      </Stack>
    </>
  );
};
