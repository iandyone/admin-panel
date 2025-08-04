

import { ChangeEventHandler, MouseEvent, useCallback, useState } from "react";

import { DEFAULT_ROWS_PER_PAGE, START_PAGE } from "@/constants";

export const usePagination = (perPage = DEFAULT_ROWS_PER_PAGE) => {
  const [page, setPage] = useState(START_PAGE);
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
