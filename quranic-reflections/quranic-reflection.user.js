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
