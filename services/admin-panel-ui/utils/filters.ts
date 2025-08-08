import { AutocompleteSearchModal } from "@/modals/autocomplete-search";
import { DateSearchModal } from "@/modals/date-search";
import { PhoneSearchModal } from '@/modals/phone-search';
import { TextSearchModal } from "@/modals/text-search";
import { EUserRoles, EUserStatuses } from "@/types";
import { EOrderStatuses } from "@/types/orders";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SortOrder = "asc" | "desc";

export function getSortedOrdersData<T extends Record<string, any>>(
  arr: T[],
  key: string,
  order: SortOrder = "asc",
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

export const getModalByLabelMap = (key: string) => {
  switch (key) {
    case "role":
    case "status":
    case "isActive":
      return AutocompleteSearchModal;
    case "date":
    case "createdAt":
    case "updatedAt":
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
