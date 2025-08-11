import { FC } from "react";

interface Props {
  primary?: string;
  fill?: string;
  stroke?: string;
}

export const FilterIcon: FC<Props> = ({ fill, stroke, primary }) => {
  return (
    <>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill={fill} />
        {/* <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#FAFAFA" /> */}
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="3.5"
          stroke={stroke}
          // stroke="#D1D7EA"
        />
        <path
          d="M10.9998 10.4994V14.4388C11.0198 14.5888 10.9698 14.7488 10.8549 14.8538C10.6599 15.0487 10.3449 15.0487 10.15 14.8538L9.14514 13.8489C9.03016 13.7339 8.98017 13.5789 9.00016 13.434V10.4994H8.98517L6.10564 6.80989C5.93567 6.59492 5.97567 6.27996 6.19063 6.10998C6.28561 6.03999 6.3906 6 6.50058 6H13.4994C13.6094 6 13.7144 6.03999 13.8094 6.10998C14.0243 6.27996 14.0643 6.59492 13.8944 6.80989L11.0148 10.4994H10.9998Z"
          fill={primary}
        />
      </svg>
    </>
  );
};
