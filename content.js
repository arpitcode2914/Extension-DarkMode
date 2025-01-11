let isDarkMode = false;

// Immediately set up message listener when content script loads
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle') {
    isDarkMode = !isDarkMode;
    toggleDarkMode();
    // Always send a response
    sendResponse({ success: true });
    return true; // Required for async response
  }
});

function toggleDarkMode() {
  if (isDarkMode) {
    document.body.style.backgroundColor = '#212529'; // Deep black for background
    document.body.style.color = '#ced4da'; // Light gray for text
    
    // Change text color for all paragraphs and headings
    const elements = document.querySelectorAll(['p, h1, h2, h3, h4, h5, h6']);
    elements.forEach(element => {
      element.style.color = '#ced4da'; // Light gray text
    //   element.style.color = '#f8f9fa'; // Light gray text
    });
    const attribute = document.querySelectorAll(['span,div']);
    attribute.forEach(element => {
    //   element.style.color = '#212529'; // Light gray text
      element.style.color = '#343a40'; // Light gray text
    //   element.style.color = '#f8f9fa'; // Light gray text
    });
    
    // Change link colors
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.style.color = '#7cb7ff'; // Soft blue for links
    //   link.style.color = '#caf0f8'; // Soft blue for links
    //   link.style.textDecoration = 'underline'; // Optional underline for clarity
    });
  } else {
    // Reset to original styles
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a,span,div');
    elements.forEach(element => {
      element.style.color = '';
    });
  }
}

// Add this to confirm the content script is loaded
console.log('Dark mode content script loaded');
