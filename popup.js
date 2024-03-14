
function displayStatus(message, isError = false) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? 'red' : 'green';
  }
  

  function customizeFeed(fieldsOfInterest) {
    const message = { action: 'customizeFeed', fieldsOfInterest };
    chrome.runtime.sendMessage(message, (response) => {
      if (response && response.success) {
        displayStatus('Instagram feed customized successfully!');
      } else {
        displayStatus('Failed to customize feed. Please try again.', true);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interestForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(checkbox => checkbox.value);
      if (interests.length === 0) {
        displayStatus('Please select at least one field of interest.', true);
      } else {
        customizeFeed(interests);
      }
    });
  });
  