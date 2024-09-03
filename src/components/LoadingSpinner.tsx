import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => {
  return <CircularProgress size={size} />;
};
