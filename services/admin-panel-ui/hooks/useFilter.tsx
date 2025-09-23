import { useCallback, useState } from "react";

import { useAppSearchParams } from "./useAppSearchParams";

export const useFilter = (key: string) => {
  const { setSearchParam, updateUrlWithSearchParams, searchParams } =
    useAppSearchParams();

  const [filterValue, setFilterValue] = useState<string>(
    searchParams.get(key) || "",
  );

  const applySearchFilterHandler = useCallback(
    (value?: string) => {
      setSearchParam(key, value || filterValue);
      updateUrlWithSearchParams();
    },
    [key, filterValue, setSearchParam, updateUrlWithSearchParams],
  );

  const resetSearchFilterHandler = useCallback(() => {
    setSearchParam(key);
    setFilterValue("");
    updateUrlWithSearchParams();
  }, [key, updateUrlWithSearchParams, setSearchParam]);

  return {
    filterValue,
    setFilterValue,
    applySearchFilterHandler,
    resetSearchFilterHandler,
  };
};
