import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useAppSeatchParams = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const updateUrlWithSearchParams = useCallback(() => {
    replace(`${pathName}?${params.toString()}`);
  }, [params, pathName, replace]);

  const setSearchParam = (key: string, value?: string) => {
    if (!value) {
      return params.delete(key);
    }

    params.set(key, value)
  }

  return {
    updateUrlWithSearchParams, setSearchParam, searchParams,
  }
}
