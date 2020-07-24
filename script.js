const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let counter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quotes from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://boiling-everglades-01282.herokuapp.com/";
  const baseUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + baseUrl);
    const data = await response.json();

    // If author is blank, add "Unknown"
    data.quoteAuthor === ""
      ? (authorText.innerText = "Unknown")
      : (authorText.innerText = data.quoteAuthor);

    // Reduce font size for long quotes
    quoteText.innerText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    if (counter > 10) {
      getQuote();
      counter++;
    }
    console.error("Sorry there is something wrong with the page!");
  }
}

// Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();
