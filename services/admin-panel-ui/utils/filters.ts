import { AutocompleteSearchModal } from "@/modals/autocomplete-search";
import { DateSearchModal } from "@/modals/date-search";
import { PhoneSearchModal } from '@/modals/phone-search';
import { TextSearchModal } from "@/modals/text-search";
import { EUserRoles, EUserStatuses, OrderData } from "@/types";
import { EOrderStatuses, OrderFilters } from "@/types/orders";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Order = "asc" | "desc";

export function getSortedOrdersData<T extends Record<string, any>>(
  arr: T[],
  key: string,
  order: Order = "asc",
): T[] {
  return [...arr].sort((a, b) => {
    const primaryValue = a[key];
    const secondaryValue = b[key];
    let cmp = 0;

    if (typeof primaryValue === "number") {
      cmp = primaryValue - secondaryValue;
    } else if (typeof primaryValue === "string") {
      cmp = primaryValue.localeCompare(secondaryValue, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    } else if (primaryValue > secondaryValue) {
      cmp = 1;
    } else if (primaryValue < secondaryValue) {
      cmp = -1;
    }

    return order === "asc" ? cmp : -cmp;
  });
}

export function getFilteredOrdersData(
  orders: OrderData[],
  filters: OrderFilters,
): OrderData[] {
  // Парсим обе граничные даты (если они заданы)
  const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
  const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

  return orders.filter((order) => {
    // Приводим order.date к Date
    const orderDate = new Date(order.date);

    // Если есть фильтр "с" и дата заказа раньше — отсекаем
    if (fromDate && orderDate < fromDate) {
      return false;
    }

    // Если есть фильтр "до" и дата заказа позже — отсекаем
    if (toDate && orderDate > toDate) {
      return false;
    }

    // Остальные фильтры
    for (const key in filters) {
      // пропускаем уже обработанные
      if (key === "dateFrom" || key === "dateTo") {
        continue;
      }

      const filterValue = filters[key as keyof OrderFilters];

      if (!filterValue) {
        continue;
      }

      if (key === "id") {
        if (order.id !== Number(filterValue)) {
          return false;
        }
      } else {
        const orderField = String(order[key as keyof OrderData]).toLowerCase();
        const filterStr = String(filterValue).toLowerCase();

        if (!orderField.includes(filterStr)) {
          return false;
        }
      }
    }

    return true;
  });
}

export const getModalByLabelMap = (key: string) => {
  switch (key) {
    case "role":
    case "status":
    case "isActive":
      return AutocompleteSearchModal;
    case "date":
    case "lastActivity":
      return DateSearchModal;
    case "phone":
      return PhoneSearchModal;

    default:
      return TextSearchModal;
  }
};

export const getModalOptionsByLabel = (
  key: string,
) => {
  switch (key) {
    case "role":
      return EUserRoles;
    case "isActive":
      return EUserStatuses;
    case "status":
      return EOrderStatuses;

    default:
      return [];
  }
};
