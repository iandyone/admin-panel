import { ChangeEventHandler, MouseEvent, useCallback, useState } from "react";

import { DEFAULT_ROWS_PER_PAGE } from "@/constants";

interface PaginationConfig {
  count: number;
  perPage?: number;
  rowsPerPageOptions?: number[];
}

export const usePagination = ({
  perPage = DEFAULT_ROWS_PER_PAGE,
}: PaginationConfig) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(perPage);

  const handleOnChangePage = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
      setPage(page);
    },
    [],
  );

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(({ target: { value } }) => {
      setRowsPerPage(parseInt(value, 10));
    }, []);

  return {
    page,
    rowsPerPage,
    handleOnChangePage,
    handleChangeRowsPerPage,
  };
};
