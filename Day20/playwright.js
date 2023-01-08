
const resolvers = {
    Query: {
      async financeData() {
        // Launch a new Chromium browser instance
        const browser = await chromium.launch();
  
        // Create a new page in the browser
        const page = await browser.newPage();
  
        // Navigate to the Yahoo Finance website
        await page.goto('https://finance.yahoo.com/');
  
        // Scrape the data you need from the page using Playwright's DOM manipulation and querying functions
        const data = await page.evaluate(() => {
          // Your code to scrape the data goes here
        });
  
        // Close the browser instance
        await browser.close();
  
        // Return the scraped data
        return data;
      }
    }
  };
  
  module.exports = resolvers;

  
  
  
  
  