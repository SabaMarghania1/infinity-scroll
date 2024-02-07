const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Spinner shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loaing Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote

function newQuote() {
  loading();
  // Pick a random quote from apiQuotes Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author filed is blank and replace it with "unknown"

  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //Check  quote length to determine styling
  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //   Set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Error Handling
  }
}

// On Load

getQuotes();

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
