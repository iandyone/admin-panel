import { Chip, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { TrendProduct } from "@/types";

export const TrendingRow: FC<TrendProduct & { index: number }> = ({
  index,
  category,
  name,
  amount,
  orderCount,
  totalAmount,
  totalQuantity,
}) => {
  return (
    <Grid container columns={3} spacing={4}>
      <Grid alignItems="center">
        <Typography
          variant="h6"
          color="textDisabled"
          fontSize={16}
          fontWeight="bold"
        >
          #{index}
        </Typography>
      </Grid>

      <Grid size="grow">
        <Stack direction="column">
          <Typography
            variant="h5"
            color="primary"
            fontSize={16}
            fontWeight="medium"
          >
            {name}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="caption"
              fontWeight="bold"
              fontSize={14}
              width={50}
            >
              ${amount}
            </Typography>

            <Chip label={category} color="info" variant="filled" />
          </Stack>
        </Stack>
      </Grid>

      <Grid width={40}>
        <Stack>
          <Typography
            variant="body2"
            color="primary"
            textAlign="center"
            fontSize={16}
            lineHeight="145%"
          >
            {orderCount}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            textAlign="center"
          >
            orders
          </Typography>
        </Stack>
      </Grid>

      <Grid width={70}>
        <Stack>
          <Typography
            variant="body2"
            color="primary"
            textAlign="center"
            fontSize={16}
            lineHeight="145%"
          >
            ${totalAmount}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            textAlign="center"
          >
            amount
          </Typography>
        </Stack>
      </Grid>

      <Grid width={35}>
        <Stack>
          <Typography
            variant="body2"
            color="primary"
            fontWeight="bold"
            textAlign="center"
            fontSize={16}
          >
            {totalQuantity}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            textAlign="center"
          >
            sales
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
