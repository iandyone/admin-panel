import { Chip, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { SparkLine } from "@/components/ui/spark-line";
import { TrendItem } from "@/types/dashboard";

export const TrendingRow: FC<TrendItem & { index: number }> = ({
  index,
  category,
  price,
  sales,
  title,
}) => {
  return (
    <Grid container columns={3} spacing={4}>
      <Grid alignItems="center">
        <Typography
          variant="h6"
          color="textDisabled"
          fontSize={18}
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
            fontSize={18}
            fontWeight="medium"
          >
            {title}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="caption"
              fontWeight="bold"
              fontSize={16}
              width={50}
            >
              ${price}
            </Typography>

            <Chip label={category} color="info" variant="filled" />
          </Stack>
        </Stack>
      </Grid>
      <Grid alignContent="center" height={40} width={100}>
        <SparkLine
          data={[1, 200, 34, 4250, 50]}
          days={[1,2,3,4,5]}
          type="positive"
          value={sales}
        />
      </Grid>

      <Grid width={35}>
        <Stack>
          <Typography
            variant="body2"
            color="primary"
            fontWeight="bold"
            textAlign="center"
            fontSize={22}
          >
            {sales}
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
