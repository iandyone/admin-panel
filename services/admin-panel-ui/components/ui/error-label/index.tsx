import { Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const ErrorLabel:FC = ({children}:PropsWithChildren) => {
  return (
    <Typography color='error' fontSize={14}>
      {children}
    </Typography>
  );
};
