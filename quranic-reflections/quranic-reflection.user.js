// ==UserScript==
// @name           Cycling Quote Popups
// @namespace    https://tampermonkey.net/
// @version      0.5
// @description  Displays quotes in cycle on every page load in a full-size popup container
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
  // Define the URL of your quotes file on GitHub
  const quotesUrl = "https://raw.githubusercontent.com/boktiarshakil/UserScriptHub/main/quranic-reflections/Bangla.txt";

  let currentQuoteIndex = 0; // Keeps track of the current quote index

  // Function to fetch quotes from the URL
  async function fetchQuotes() {
    try {
      const response = await fetch(quotesUrl);
      const text = await response.text();
      const quotesArray = text.split(",");
      return quotesArray.map(quote => quote.trim());
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return []; // Return empty array if fetching fails
    }
  }

  // Function to get the next quote in cycle
  async function getNextQuote() {
    const quotesArray = await fetchQuotes(); // Fetch quotes from URL
    currentQuoteIndex = (currentQuoteIndex + 1) % quotesArray.length; // Cycle through quotes
    return quotesArray[currentQuoteIndex];
  }

  // Create the popup container and quote element (same as before)
  const popupContainer = document.createElement("div");
  popupContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* Use vh for full viewport height */
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: pointer; /* Add cursor pointer to indicate clickability */
  `;
  const quoteElement = document.createElement("p");
  // ... (styling definitions) ...

  // Add click event listener to close popup
  popupContainer.addEventListener("click", () => {
    popupContainer.remove();
  });

  async function showPopup() {
    const quote = await getNextQuote();
    quoteElement.textContent = quote;
    popupContainer.appendChild(quoteElement);
    document.body.appendChild(popupContainer);
  }

  // Show popup on every page load
  window.addEventListener("load", showPopup);

  // Store the current quote index in localStorage (optional)
  if (typeof localStorage !== "undefined") {
    const storedIndex = localStorage.getItem("currentQuoteIndex");
    if (storedIndex) {
      currentQuoteIndex = parseInt(storedIndex);
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("currentQuoteIndex", currentQuoteIndex);
    });
  }
})();
