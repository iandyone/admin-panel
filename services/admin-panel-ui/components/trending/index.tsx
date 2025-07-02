import { Stack, Typography } from "@mui/material";
import { FC } from "react";

import { TrendingRow } from "@/components/ui/trending-row";
import { TrendItem } from "@/types/dashboard";

const itemsData: TrendItem[] = [
  {
    id: 1,
    title: "Pizza Meal for Kids (Small size)",
    category: "pizza",
    price: 9.5,
    sales: 524,
  },
  {
    id: 2,
    title: "Medium spicy spaghetti Italiano",
    category: "spaghetti",
    price: 12.35,
    sales: 215,
  },
  {
    id: 3,
    title: "Watermelon Juice with Ice",
    category: "drink",
    price: 14.99,
    sales: 97,
  },
  // {
  //   id: 3,
  //   title: "Supreme Pizza with Beef Topping",
  //   category: "pizza",
  //   price: 11.2,
  //   sales: 173,
  // },
  // {
  //   id: 4,
  //   title: "Mozzarella Pizza with Random Topping",
  //   category: "pizza",
  //   price: 8.15,
  //   sales: 134,
  // },
  // {
  //   id: 5,
  //   title: "Watermelon Juice with Ice",
  //   category: "drink",
  //   price: 14.99,
  //   sales: 97,
  // },
];

export const Trending: FC = () => {
  return (
    <Stack spacing={3} height={300}>
      <Stack>
        <Typography
          component="h2"
          variant="body1"
          fontSize={22}
          fontWeight="700"
        >
          Trending Items
        </Typography>
        <Typography component="h2" variant="caption">
          Most selling items
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {itemsData.map((trendItem, index) => (
          <TrendingRow key={trendItem.id} index={index +1} {...trendItem} />
        ))}
      </Stack>
    </Stack>
  );
};
