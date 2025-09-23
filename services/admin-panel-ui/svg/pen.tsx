import { FC } from "react";

interface Props {
  fill?: string;
  stroke?: string;
}

export const PenIcon: FC<Props> = ({ fill = 'none', stroke }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={fill}>
      <path
        d="M10.9214 5.24428L4.93148 11.5844C4.70531 11.8252 4.48643 12.2994 4.44266 12.6278L4.17271 14.9916C4.07786 15.8453 4.69072 16.4289 5.53704 16.283L7.88633 15.8817C8.21465 15.8234 8.67429 15.5826 8.90046 15.3345L14.8904 8.99438C15.9264 7.9 16.3934 6.65239 14.781 5.12755C13.1759 3.61729 11.9575 4.14989 10.9214 5.24428Z"
        // stroke="#71799B"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.92197 6.30225C10.2357 8.31592 11.87 9.85536 13.8982 10.0596"
        stroke={stroke}
        // stroke="#71799B"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
