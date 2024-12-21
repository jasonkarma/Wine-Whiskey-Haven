import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import store from './redux/store';
import initializeDatabase from './firebase/initializeData';
import Toast from './components/common/Toast';
import LoadingSpinner from './components/common/LoadingSpinner';

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

function App() {
  const [toast, setToast] = React.useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    // Initialize database with sample products
    initializeDatabase().catch(error => {
      setToast({
        open: true,
        message: 'Failed to initialize database',
        severity: 'error'
      });
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="App">
              <LazyNavbar />
              <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
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
              </main>
              <LazyFooter />
            </div>
          </Suspense>
          <Toast
            open={toast.open}
            handleClose={handleCloseToast}
            severity={toast.severity}
            message={toast.message}
          />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
