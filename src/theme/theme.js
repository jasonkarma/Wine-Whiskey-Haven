import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800020', // Deep burgundy
      light: '#a33',
      dark: '#600018',
    },
    secondary: {
      main: '#FFD700', // Gold
      light: '#ffe033',
      dark: '#ccac00',
    },
    background: {
      default: '#F5F5F5', // Off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#36454F', // Charcoal
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default theme;
