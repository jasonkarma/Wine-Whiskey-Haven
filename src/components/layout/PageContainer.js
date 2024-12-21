import React from 'react';
import { Container, Box } from '@mui/material';

const PageContainer = ({ children, maxWidth = "lg" }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        pt: { xs: 8, sm: 8, md: 9 }, // Top padding to account for navbar
        pb: { xs: 4, sm: 6, md: 8 }, // Bottom padding
        mt: { xs: 0, sm: 0, md: 0 }, // No top margin needed due to padding
        px: { xs: 2, sm: 3, md: 4 }, // Consistent horizontal padding
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          height: '100%',
          py: { xs: 2, sm: 3, md: 4 }, // Vertical padding inside container
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
