import { useCallback, useState } from "react";

import { useAppSeatchParams } from "./useAppSearchParams";

export const useFilter = (key: string) => {
  const { setSearchParam, updateUrlWithSearchParams, searchParams } =
    useAppSeatchParams();

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
