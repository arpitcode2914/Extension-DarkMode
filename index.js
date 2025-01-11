document.getElementById('toggle-button').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we can inject into this tab
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
      console.log('Cannot inject into browser pages');
      return;
    }

    // Send message to content script
    await chrome.tabs.sendMessage(tab.id, { action: 'toggle' }).catch((err) => {
      // If content script is not loaded, inject it
      if (err.message.includes('Receiving end does not exist')) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
