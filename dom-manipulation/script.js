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
