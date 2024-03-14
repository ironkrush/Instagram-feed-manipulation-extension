chrome.runtime.onInstalled.addListener(() => {
    console.log('Instagram Customizer extension installed!');
  });
  

  function sendMessageToContentScript(tabId, message, callback) {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        callback(response);
      }
    });
  }
  

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'customizeFeed') {

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
         
          sendMessageToContentScript(activeTab.id, message, sendResponse);
        } else {
          console.error('No active tab found.');
          sendResponse({ success: false });
        }
      });
     
      return true;
    }
  });
  

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
     
      chrome.tabs.executeScript(tabId, { code: 'typeof customizeFeed === "function"' }, (results) => {
        if (chrome.runtime.lastError || !results || results[0] !== 'function') {
       
          chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
            console.log('Content script injected.');
          });
        }
      });
    }
  });
  