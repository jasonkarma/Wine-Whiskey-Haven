import React, { Component } from 'react';

class IOSErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    
    // Check if we're on iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Override handleError function
      window.handleError = () => true;
      
      // Basic error suppression
      window.onerror = () => true;
      console.error = () => {};

      // Handle bundle.js errors
      const handleBundleError = (e) => {
        if (e.message === 'Script error.' || 
            e.message?.includes('bundle.js') ||
            e.filename?.includes('bundle.js')) {
          e.preventDefault();
          e.stopPropagation();
          return true;
        }
      };

      // Add error listeners
      window.addEventListener('error', handleBundleError, true);
      window.addEventListener('unhandledrejection', (e) => {
        if (e.reason?.message === 'Script error.' ||
            e.reason?.stack?.includes('bundle.js')) {
          e.preventDefault();
          e.stopPropagation();
          return true;
        }
      }, true);

      // Ensure ethereum object exists
      if (typeof window.ethereum === 'undefined') {
        window.ethereum = {
          selectedAddress: null,
          isMetaMask: false,
          _metamask: { isUnlocked: false },
          request: () => Promise.reject(new Error('MetaMask not available')),
          on: () => {},
          removeListener: () => {},
          enable: () => Promise.reject(new Error('MetaMask not available')),
          send: () => Promise.reject(new Error('MetaMask not available')),
          sendAsync: () => Promise.reject(new Error('MetaMask not available')),
          autoRefreshOnNetworkChange: false,
          chainId: null,
          networkVersion: null,
          isConnected: () => false
        };
      }

      // Override React Error Overlay
      if (window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__) {
        window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__.handleRuntimeError = () => {};
        window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__.startReportingRuntimeErrors = () => {};
        window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__.dismissRuntimeErrors = () => {};
      }
    }
  }

  static getDerivedStateFromError(error) {
    // Always return false on iOS to prevent error state
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return { hasError: false };
    }
    return { hasError: true };
  }

  componentDidMount() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Override handleError after mount
      window.handleError = () => true;
    }
  }

  componentDidCatch(error, errorInfo) {
    // Suppress all errors on iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return;
    }
    
    // Handle errors for other platforms
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    // Never show error state on iOS
    if (this.state.hasError && !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default IOSErrorBoundary;
