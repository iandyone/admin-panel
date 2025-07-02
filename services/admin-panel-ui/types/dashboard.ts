import { ReactNode } from "react";

export interface ShowcaseDataMock {
  id: number;
  title: string;
  value: ReactNode;
  data?: number[];
  chip?: {
    isPositive: boolean;
    value: ReactNode;
  };
}

export interface TrendItem {
  id: number;
  title: string;
  category: string;
  price: number;
  sales: number;
  chart?: {
    idPositive: boolean;
    data: number[];
  };
}
