import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingSpinner;