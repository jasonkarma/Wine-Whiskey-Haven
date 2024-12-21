// iOS specific helper functions
export const isIOSDevice = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

export const setupIOSHandlers = () => {
  // Prevent iOS bounce effect
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
  
  // Prevent iOS double-tap zoom
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
  document.getElementsByTagName('head')[0].appendChild(meta);
  
  // Prevent iOS text selection
  document.body.style.webkitUserSelect = 'none';
  document.body.style.webkitTouchCallout = 'none';
};

export const cleanupIOSHandlers = () => {
  // Remove iOS specific styles
  document.body.style.overscrollBehavior = '';
  document.documentElement.style.overscrollBehavior = '';
  document.body.style.webkitUserSelect = '';
  document.body.style.webkitTouchCallout = '';
  
  // Remove viewport meta tag
  const meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.remove();
  }
};

// Function to handle iOS-specific errors
export const handleIOSError = (error) => {
  // Suppress certain iOS-specific errors
  const isIOSSpecificError = error.message.includes('gesture') || 
                            error.message.includes('touch') ||
                            error.message.includes('WebKit');
  
  if (!isIOSSpecificError) {
    console.error('Error:', error);
  }
  
  return isIOSSpecificError;
};
