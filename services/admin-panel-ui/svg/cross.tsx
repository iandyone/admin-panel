import { FC } from "react";

interface Props {
  fill?: string;
  stroke?: string;
}

export const CrossIcon: FC<Props> = ({ fill = "none", stroke }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={fill}>
      <path
        d="M14 6L6 14M6 6L14 14"
        // stroke="#9BA1BD"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
