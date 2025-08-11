import { FC } from "react";

interface Props {
  primary?: string;
  fill?: string;
  stroke?: string;
}

export const ResetFilterIcon: FC<Props> = ({ fill, stroke, primary }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g opacity="0.4">
        <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill={primary} /* fill="#FAFAFA" */ />
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="3.5"
          // stroke="#D1D7EA"
          stroke={stroke}
        />
        <path
          d="M5.25814 4.75L4.59985 5.40314L8.91471 9.70771L9.15642 10.0317H9.17185V13.0506C9.15128 13.1997 9.20271 13.3591 9.321 13.4774L10.3547 14.5111C10.5553 14.7117 10.8793 14.7117 11.0799 14.5111C11.1981 14.4031 11.2496 14.2386 11.229 14.0843V12.0323L14.7467 15.55L15.3999 14.8969L11.229 10.726L8.86842 8.36543L6.16328 5.66029L5.25814 4.75ZM7.22271 5.40314L11.5067 9.69229L14.2067 6.23629C14.3816 6.01514 14.3404 5.69114 14.1193 5.51629C14.0216 5.44429 13.9136 5.40314 13.8004 5.40314H7.22271Z"
          // fill="#71799B"
          fill={fill}
        />
      </g>
    </svg>
  );
};
