let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerText = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save quotes to local storage
        displayQuotes(); // Update the displayed quotes
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    }
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate the categories dynamically from the quotes array
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

// Filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    displayQuotes(selectedCategory); // Show quotes based on selected category
    localStorage.setItem('selectedCategory', selectedCategory); // Save selected category to localStorage
}

// Display quotes based on the selected category
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

// Simulate server interaction for syncing quotes
const serverQuotesUrl = 'https://jsonplaceholder.typicode.com/posts';  // Placeholder URL

function fetchQuotesFromServer() {
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

// Sync quotes with the server periodically
function syncQuotes() {
    setInterval(fetchQuotesFromServer, 30000); // Fetch every 30 seconds
}

// Notify users about data conflicts
function showConflictNotification() {
    alert('Some of your data was updated due to server changes.');
}

// Initialize the app when the page is loaded
window.onload = function() {
    populateCategories();  // Populate the category filter dropdown
    displayQuotes();  // Display all quotes by default
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    displayQuotes(lastSelectedCategory); // Display quotes based on saved category

    // Create and append the "Add New Quote" form dynamically
    createAddQuoteForm();
};

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Start syncing with the server
syncQuotes();

// Function to create and append the "Add New Quote" form dynamically
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    // Create and append the text input for the new quote
    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.id = 'newQuoteText';
    newQuoteTextInput.type = 'text';
    newQuoteTextInput.placeholder = 'Enter a new quote';
    formContainer.appendChild(newQuoteTextInput);

    // Create and append the category input for the new quote
    const newQuoteCategoryInput = document.createElement('input');
    newQuoteCategoryInput.id = 'newQuoteCategory';
    newQuoteCategoryInput.type = 'text';
    newQuoteCategoryInput.placeholder = 'Enter quote category';
    formContainer.appendChild(newQuoteCategoryInput);

    // Create and append the button to add the quote
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    addQuoteButton.onclick = addQuote;
    formContainer.appendChild(addQuoteButton);

    // Append the form to the body or a specific container
    document.body.appendChild(formContainer);
}
