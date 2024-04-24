// ==UserScript==
// @name       Quranic Reflections Popups (Bangla)
// @namespace  https://tampermonkey.net/
// @version    0.1
// @description Displays random quotes from Quranic Reflections (Bangla) on every page load
// @author     You
// @match      *://*/*
// @icon         https://quranonline.net/favicon.ico
// @grant      none
// ==/UserScript==

(function() {
  const quotesUrl = "https://raw.githubusercontent.com/boktiarshakil/UserScriptHub/main/quranic-reflections/Bangla.txt";

  // Function to fetch quotes from the URL
  async function fetchQuotes() {
    try {
      const response = await fetch(quotesUrl);
      const text = await response.text();
      return text.split(","); // Split the comma-separated quotes into an array
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return [];
    }
  }

  // Function to get a random quote from the fetched quotes array
  async function getRandomQuote(quotes) {
    if (!quotes.length) {
      console.error("No quotes available");
      return "";
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex].trim(); // Trim any leading/trailing whitespace
  }

  // Create the popup container and quote element
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
  quoteElement.style.cssText = `
    font-size: 24px;
    font-family: Arial, sans-serif;
    color: #fff;
  `;

  // Add click event listener to close popup
  popupContainer.addEventListener("click", () => {
    popupContainer.remove();
  });

  function showErrorMessage() {
    const errorContainer = document.createElement("div");
    errorContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      cursor: pointer; /* Add cursor pointer to indicate clickability */
    `;
    const errorMessage = document.createElement("p");
    errorMessage.style.cssText = `
      font-size: 24px;
      font-family: Arial, sans-serif;
      color: #fff;
    `;
    errorMessage.textContent = "There was an error fetching or displaying quotes. Please check the console for details.";
    errorContainer.appendChild(errorMessage);
    document.body.appendChild(errorContainer);

    // Add click event listener to dismiss the error message
    errorContainer.addEventListener("click", () => {
      errorContainer.remove();
    });
  }

  async function showPopup() {
    try {
      const quotes = await fetchQuotes();
      const quote = await getRandomQuote(quotes);
      if (quote) {
        quoteElement.textContent = quote;
        popupContainer.appendChild(quoteElement);
        document.body.appendChild(popupContainer);
      } else {
        // Handle case where no quote is retrieved (optional)
      }
    } catch (error) {
      console.error("Error fetching or displaying quote:", error);
      showErrorMessage();
    }
  }

  // Show popup on every page load
  window.addEventListener("load", showPopup);
})();
