const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('quote-author');

const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function hideLoading() {
  if (!loader.hidden) loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];

// Get quotes from API: https://type.fit/api/quotes
const getQuotesFromAPI = async () => {
  showLoading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    Alert('Quote not found. Try the next one.', error);
  }
};

// Show new quotes
const newQuote = () => {
  showLoading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Display 'Unknown' when author field is 'null'
  if (!quote.author) {
    authorText.innerText = '- Unknown';
  } else {
    authorText.innerText = `- ${quote.author}`;
  }

  // Decrease font size when quote text is longer than 100 characters
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.innerText = quote.text;

  hideLoading();
};

// Load getQuotesFromAPI()
getQuotesFromAPI();

// Tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
};

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
