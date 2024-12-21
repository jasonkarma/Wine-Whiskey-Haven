// Mobile device detection
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// iOS specific detection
export const isIOSDevice = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Handle iOS specific touch events
export const preventIOSBounce = (event) => {
  // Only prevent default if we're at the top or bottom of the page
  if (isIOSDevice()) {
    const element = event.target;
    const isAtTop = element.scrollTop === 0;
    const isAtBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
      event.preventDefault();
    }
  }
};

// Setup iOS specific event handlers
export const setupIOSHandlers = () => {
  if (isIOSDevice()) {
    // Prevent elastic scrolling
    document.body.style.overscrollBehavior = 'none';
    
    // Add touch handlers if needed
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // Suppress iOS-specific errors
    const suppressIOSErrors = (event) => {
      const errorMessage = event.message || event.reason?.message;
      if (errorMessage && (
        errorMessage.includes('ethereum') ||
        errorMessage.includes('web3') ||
        errorMessage.includes('selectedAddress') ||
        errorMessage.includes('MetaMask')
      )) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    // Add error handlers specifically for iOS
    window.addEventListener('error', suppressIOSErrors, true);
    window.addEventListener('unhandledrejection', suppressIOSErrors, true);

    return () => {
      window.removeEventListener('error', suppressIOSErrors);
      window.removeEventListener('unhandledrejection', suppressIOSErrors);
    };
  }
};

// Cleanup iOS specific event handlers
export const cleanupIOSHandlers = () => {
  if (isIOSDevice()) {
    document.body.style.overscrollBehavior = '';
    document.removeEventListener('touchmove', () => {});
  }
};
