// Array to store the quotes, each with text and category
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" },
    { text: "The best way to predict your future is to create it.", category: "Motivation" }
];

// Function to display a random quote using innerHTML
function displayRandomQuote() {
    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Get the quote display element and update its content using innerHTML
    const quoteElement = document.getElementById("quoteDisplay");
    quoteElement.innerHTML = `"${randomQuote.text}" <em>- ${randomQuote.category}</em>`; // Using innerHTML for HTML formatting
}

// Function to handle adding a new quote
function addQuote() {
    // Get the values from the input fields
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    // If both fields have values, add the new quote to the array
    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Clear the input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        // Optionally show the new quote immediately
        displayRandomQuote();
    } else {
        alert("Please fill in both fields.");
    }
}

// Set up event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);

// Show a random quote when the page loads
window.onload = displayRandomQuote;



let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

        function addQuote(quote) {
            quotes.push(quote);
            saveQuotes();
            displayQuotes();
        }

        function saveQuotes() {
            localStorage.setItem("quotes", JSON.stringify(quotes));
        }

        function displayQuotes() {
            const quotesContainer = document.getElementById("quotesContainer");
            quotesContainer.innerHTML = "";
            quotes.forEach(quote => {
                const quoteElement = document.createElement("div");
                quoteElement.textContent = quote;
                quotesContainer.appendChild(quoteElement);
            });
        }

        function exportToJson() {
            const jsonBlob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(jsonBlob);
            link.download = "quotes.json";
            link.click();
        }

        function importFromJsonFile(event) {
            const fileReader = new FileReader();
            fileReader.onload = function(event) {
                const importedQuotes = JSON.parse(event.target.result);
                quotes.push(...importedQuotes);
                saveQuotes();
                displayQuotes();
                alert('Quotes imported successfully!');
            };
            fileReader.readAsText(event.target.files[0]);
        }

        window.onload = function() {
            displayQuotes();
        };
