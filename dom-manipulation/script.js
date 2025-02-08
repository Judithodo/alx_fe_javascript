// Initial setup: Create an empty array for quotes
let quotes = [];

// Create the "Add Quote" form dynamically
function createAddQuoteForm() {
    const formContainer = document.createElement('div'); // Create a div to hold the form elements

    // Create an input field for the quote text
    const quoteTextInput = document.createElement('input');
    quoteTextInput.id = 'newQuoteText';
    quoteTextInput.type = 'text';
    quoteTextInput.placeholder = 'Enter a new quote';

    // Create an input field for the quote category
    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.id = 'newQuoteCategory';
    quoteCategoryInput.type = 'text';
    quoteCategoryInput.placeholder = 'Enter quote category';

    // Create the "Add Quote" button
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    addQuoteButton.onclick = function () {
        addQuote(); // Call addQuote when the button is clicked
    };

    // Append inputs and button to the form container
    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(quoteCategoryInput);
    formContainer.appendChild(addQuoteButton);

    // Append the form container to the body or a specific container
    document.body.appendChild(formContainer);
}

// Display quotes on the page
function displayQuotes() {
    const quotesContainer = document.getElementById('quotesContainer');
    quotesContainer.innerHTML = ''; // Clear previous quotes

    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `${quote.text} - ${quote.category}`;
        quotesContainer.appendChild(quoteElement);
    });
}

// Show a random quote
function showRandomQuote() {
    if (quotes.length > 0) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
    }
}

// Add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        displayQuotes(); // Update the quotes displayed on the page
    } else {
        alert('Please enter both quote text and category');
    }
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Load quotes when the page loads
window.onload = function () {
    // Placeholder: load some quotes if desired
    quotes = [
        { text: 'Life is what happens when you\'re busy making other plans.', category: 'Life' },
        { text: 'The only limit to our realization of tomorrow is our doubts of today.', category: 'Motivation' },
        { text: 'In the end, we will remember not the words of our enemies, but the silence of our friends.', category: 'Wisdom' }
    ];

    displayQuotes();
    showRandomQuote();
    createAddQuoteForm(); // Create the form to add new quotes dynamically
};


// IMPLEMENTING WEB STORAGE AND JSON HANDLING
// Initial setup: Create an empty array for quotes
let quotes = [];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const quotesJson = JSON.stringify(quotes);
    const blob = new Blob([quotesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save the imported quotes to local storage
        displayQuotes(); // Update the quotes displayed on the page
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Check if the "Export Quotes" button exists in the DOM
const exportQuotesButton = document.querySelector('button[onclick="exportToJsonFile()"]');

if (exportQuotesButton) {
    console.log('Export Quotes button exists!');
} else {
    console.log('Export Quotes button is missing from index.html');
}

// Event listener for importing quotes
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Load quotes from local storage when the page loads
window.onload = function () {
    loadQuotes();
    displayQuotes();  // Display the quotes on the page
};

// Optional: Using session storage to remember the last viewed quote
function saveLastViewedQuoteIndex(index) {
    sessionStorage.setItem('lastViewedQuoteIndex', index);
}

function loadLastViewedQuoteIndex() {
    return sessionStorage.getItem('lastViewedQuoteIndex');
}

// Function to display quotes on the page
function displayQuotes() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';  // Clear existing quotes
    
    quotes.forEach((quote, index) => {
        const quoteDiv = document.createElement('div');
        quoteDiv.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteDiv);
    });
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Function to show a random quote
function displayRandomQuote() {
    if (quotes.length > 0) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        alert(`"${randomQuote.text}" - ${randomQuote.category}`);
    }
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };
        quotes.push(newQuote);
        saveQuotes(); // Save new quote to local storage
        displayQuotes(); // Update displayed quotes
        alert('New quote added!');
    } else {
        alert('Please enter both quote text and category!');
    }
}


// Creating a Dynamic Content Filtering System Using Web Storage and JSON
let quotes = [];

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to populate categories dynamically using `map` method
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  
  // Extract unique categories using `map` and `Set`
  const categories = ['all', ...[...new Set(quotes.map(quote => quote.category))]];

  // Clear the existing options
  categoryFilter.innerHTML = '';

  // Add the "all" option first
  categoryFilter.appendChild(new Option('All Categories', 'all'));

  // Add the other categories
  categories.forEach(category => {
    categoryFilter.appendChild(new Option(category, category));
  });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  displayQuotes(filteredQuotes);

  // Save the selected category to local storage
  localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Function to display quotes on the page
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';  // Clear existing quotes

  filteredQuotes.forEach(quote => {
    const quoteDiv = document.createElement('div');
    quoteDiv.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteDiv);
  });
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };
    quotes.push(newQuote);
    saveQuotes();  // Save new quote to local storage
    populateCategories(); // Update categories dropdown
    filterQuotes(); // Update the displayed quotes based on selected category
    alert('New quote added!');
  } else {
    alert('Please enter both quote text and category!');
  }
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const quotesJson = JSON.stringify(quotes);
  const blob = new Blob([quotesJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Save the imported quotes to local storage
    populateCategories(); // Update categories dropdown
    filterQuotes(); // Update displayed quotes
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Function to display a random quote
function displayRandomQuote() {
  if (quotes.length > 0) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(`"${randomQuote.text}" - ${randomQuote.category}`);
  }
}

// Load quotes and category filter from local storage on page load
window.onload = function () {
  loadQuotes();
  populateCategories();

  // Restore the last selected category from local storage
  const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
  document.getElementById('categoryFilter').value = lastSelectedCategory;
  filterQuotes();  // Display quotes based on last selected category
};


// Syncing Data with Server and Implementing Conflict Resolution
let quotes = []; 

// Simulate server interaction using JSONPlaceholder
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch data from server (simulate server interaction)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    syncQuotes(serverQuotes);
  } catch (error) {
    console.error('Error fetching from server:', error);
  }
}

// Periodically fetch new quotes every 5 minutes (300000ms)
setInterval(fetchQuotesFromServer, 300000);

// Sync local quotes with the server's data
function syncQuotes(serverQuotes) {
  if (serverQuotes.length > 0) {
    const serverQuoteIds = serverQuotes.map(quote => quote.id);
    const localQuoteIds = quotes.map(quote => quote.id);

    // Compare local quotes with server quotes and resolve conflicts
    serverQuotes.forEach(serverQuote => {
      const localQuoteIndex = localQuoteIds.indexOf(serverQuote.id);

      if (localQuoteIndex === -1) {
        // If the quote doesn't exist locally, add it
        quotes.push(serverQuote);
      } else {
        // If the quote exists locally, resolve the conflict by prioritizing server data
        quotes[localQuoteIndex] = serverQuote;
      }
    });

    // Save updated quotes to local storage
    saveQuotes();
    displayQuotes(quotes);
    
    // Notify user that quotes have been synced with the server
    alert('Quotes synced with server!');
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to display quotes on the page
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = ''; // Clear existing quotes

  filteredQuotes.forEach(quote => {
    const quoteDiv = document.createElement('div');
    quoteDiv.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteDiv);
  });
}

// Function to manually sync data from the server (button triggered)
function manualSync() {
  fetchQuotesFromServer();
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Function to display a random quote
function displayRandomQuote() {
  if (quotes.length > 0) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(`"${randomQuote.text}" - ${randomQuote.category}`);
  }
}

// Function to add a new quote and send it to the server (via POST)
async function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (!newQuoteText || !newQuoteCategory) {
    alert('Please enter both quote text and category.');
    return;
  }

  const newQuote = {
    id: Date.now(), // Unique ID based on current timestamp
    text: newQuoteText,
    category: newQuoteCategory
  };

  // Add the new quote to the local quotes array
  quotes.push(newQuote);
  saveQuotes();
  displayQuotes(quotes);

  // Send the new quote to the server using POST
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set content type to JSON
      },
      body: JSON.stringify(newQuote) // Send the new quote as JSON in the body
    });

    if (!response.ok) {
      throw new Error('Failed to add quote to the server.');
    }

    const serverResponse = await response.json();
    console.log('New quote added to server:', serverResponse);
    alert('Quote added and synced with the server!');
  } catch (error) {
    console.error('Error posting quote to server:', error);
    alert('Failed to add the quote to the server.');
  }
}

// Load quotes from local storage on page load
window.onload = function () {
  loadQuotes();
  displayQuotes(quotes);
};

