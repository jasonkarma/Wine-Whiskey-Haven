import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, useMediaQuery } from '@mui/material';
import theme from './theme/theme';
import store from './redux/store';
import initializeDatabase from './firebase/initializeData';
import Toast from './components/common/Toast';
import LoadingSpinner from './components/common/LoadingSpinner';
import IOSErrorBoundary from './components/IOSErrorBoundary';

// Layout Components
const LazyNavbar = lazy(() => import('./components/layout/Navbar'));
const LazyFooter = lazy(() => import('./components/layout/Footer'));

// Page Components
const LazyHome = lazy(() => import('./pages/Home'));
const LazyWhiskeyMenu = lazy(() => import('./pages/WhiskeyMenu'));
const LazyWineMenu = lazy(() => import('./pages/WineMenu'));
const LazyAbout = lazy(() => import('./pages/About'));
const LazyContact = lazy(() => import('./pages/Contact'));
const LazyCart = lazy(() => import('./pages/Cart'));
const LazyCheckout = lazy(() => import('./pages/Checkout'));
const LazyProfile = lazy(() => import('./pages/Profile'));
const LazyProductDetail = lazy(() => import('./pages/ProductDetail'));
const LazyLogin = lazy(() => import('./pages/Login'));
const LazyRegister = lazy(() => import('./pages/Register'));
const LazyWishlist = lazy(() => import('./pages/Wishlist'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Only log errors that aren't related to ethereum
    if (!error.message?.includes('ethereum') && !error.message?.includes('web3')) {
      console.error('Error:', error);
      console.log('Error Info:', errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          p={3}
          textAlign="center"
        >
          <h1>Something went wrong.</h1>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </Box>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [toast, setToast] = React.useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    // Add custom error handler
    const handleError = (event) => {
      if (event.error?.message?.includes('ethereum') || 
          event.error?.message?.includes('web3') ||
          event.error?.message?.includes('selectedAddress') ||
          event.error?.message?.includes('MetaMask')) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleError);
    
    const init = async () => {
      try {
        await initializeDatabase();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };
    init();

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        setToast({
          open: true,
          message: 'Failed to initialize database',
          severity: 'error'
        });
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <IOSErrorBoundary>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                  width: '100%',
                  overflowX: 'hidden'
                }}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyNavbar isMobile={isMobile} />
                  <Container 
                    component="main" 
                    sx={{ 
                      flex: 1,
                      pt: { xs: 2, sm: 3 },
                      pb: { xs: 2, sm: 3 },
                      px: { xs: 2, sm: 3 }
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<LazyHome />} />
                      <Route path="/whiskey" element={<LazyWhiskeyMenu />} />
                      <Route path="/wine" element={<LazyWineMenu />} />
                      <Route path="/about" element={<LazyAbout />} />
                      <Route path="/contact" element={<LazyContact />} />
                      <Route path="/cart" element={<LazyCart />} />
                      <Route path="/checkout" element={<LazyCheckout />} />
                      <Route path="/profile" element={<LazyProfile />} />
                      <Route path="/product/:id" element={<LazyProductDetail />} />
                      <Route path="/login" element={<LazyLogin />} />
                      <Route path="/register" element={<LazyRegister />} />
                      <Route path="/wishlist" element={<LazyWishlist />} />
                    </Routes>
                  </Container>
                  <LazyFooter />
                </Suspense>
              </Box>
            </Router>
            <Toast
              open={toast.open}
              message={toast.message}
              severity={toast.severity}
              onClose={handleCloseToast}
            />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </IOSErrorBoundary>
  );
}

export default App;
