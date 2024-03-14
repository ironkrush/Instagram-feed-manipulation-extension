
function customizeFeed(fieldsOfInterest) {
  const posts = document.querySelectorAll('article');
  posts.forEach(post => {
    const postText = post.textContent.toLowerCase();
    const matchesInterest = fieldsOfInterest.some(field => postText.includes(field.toLowerCase()));
    if (!matchesInterest) {
      post.style.display = 'none';
    }
  });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'customizeFeed') {
    customizeFeed(message.fieldsOfInterest);
    sendResponse({ success: true });
  }
});
