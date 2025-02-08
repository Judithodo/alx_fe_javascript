let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `${randomQuote.text} - ${randomQuote.category}`;
}

// Add a new quote to the array and update the DOM
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        displayQuotes(); // Update displayed quotes
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    }
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate category dropdown dynamically
function populateCategories() {
    const categories = new Set();
    quotes.forEach(quote => categories.add(quote.category));

    const categoryFilter = document.getElementById('categoryFilter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    displayQuotes(selectedCategory);
    localStorage.setItem('selectedCategory', selectedCategory); // Save selected filter
}

// Display quotes based on the category filter
function displayQuotes(category = 'all') {
    const quotesContainer = document.getElementById('quotesContainer');
    quotesContainer.innerHTML = ''; // Clear previous quotes

    const filteredQuotes = category === 'all' ? quotes : quotes.filter(q => q.category === category);
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quotesContainer.appendChild(quoteElement);
    });
}

// Export quotes to a JSON file
function exportToJson() {
    const jsonBlob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(jsonBlob);
    link.download = 'quotes.json';
    link.click();
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Merge imported quotes
        saveQuotes(); // Update localStorage with merged quotes
        displayQuotes(); // Display updated quotes
        populateCategories(); // Update categories dropdown
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Simulate server interaction
const serverQuotesUrl = 'https://jsonplaceholder.typicode.com/posts';  // Placeholder URL

function syncWithServer() {
    fetch(serverQuotesUrl)
        .then(response => response.json())
        .then(serverQuotes => {
            resolveConflicts(serverQuotes);
        });
}

// Resolve conflicts with server data
function resolveConflicts(serverQuotes) {
    const mergedQuotes = [...quotes];
    serverQuotes.forEach(serverQuote => {
        const index = mergedQuotes.findIndex(quote => quote.id === serverQuote.id);
        if (index !== -1) {
            mergedQuotes[index] = serverQuote; // Resolve conflict by replacing with server data
        } else {
            mergedQuotes.push(serverQuote); // Add new quotes from server
        }
    });
    quotes = mergedQuotes;
    saveQuotes();
    displayQuotes();
}

// Notify users about data conflicts
function showConflictNotification() {
    alert('Some of your data was updated due to server changes.');
}

// Simulate fetching data every 30 seconds
setInterval(syncWithServer, 30000);

// Initialize the app when the page is loaded
window.onload = function() {
    populateCategories();  // Populate the category filter dropdown
    displayQuotes();  // Display all quotes by default
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    displayQuotes(lastSelectedCategory); // Display quotes based on saved category
};
