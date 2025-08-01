import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export const useSearch = (key: string) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const [filterValue, setFilterValue] = useState(searchParams.get(key) || "");

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const updateUrlParams = useCallback(() => {
    replace(`${pathName}?${params.toString()}`);
  }, [params, pathName, replace]);

  const applySearchFilterHandler = useCallback(() => {
    if (filterValue) {
      params.set(key, String(filterValue));
    } else {
      params.delete(key);
    }

    updateUrlParams();
  }, [key, params, filterValue, updateUrlParams]);

  const resetSearchFilterHandler = useCallback(() => {
    params.delete(key);
    setFilterValue("");
    updateUrlParams();
  }, [key, params, updateUrlParams]);

  return {
    filterValue,
    setFilterValue,
    applySearchFilterHandler,
    resetSearchFilterHandler,
  };
};
