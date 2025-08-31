import { Skeleton, SkeletonProps } from "@mui/material";
import { FC } from "react";

export const SkeletonLoader: FC<SkeletonProps> = ({
  height,
  width = "100%",
  variant = "rectangular",
  ...props
}) => {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.200" }}
      animation="wave"
      height={height}
      width={width}
      variant={variant}
      {...props}
    />
  );
};
