// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read || false;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Library array to store books
const myLibrary = [];

// Function to add book to library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to display books
function displayBooks() {
    const libraryDisplay = document.getElementById('library-display');
    libraryDisplay.innerHTML = ''; // Clear existing display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.index = index;

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <div class="book-actions">
                <button class="toggle-read-btn">Toggle Read</button>
                <button class="remove-book-btn">Remove</button>
            </div>
        `;

        libraryDisplay.appendChild(bookCard);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const newBookBtn = document.getElementById('new-book-btn');
    const bookFormDialog = document.getElementById('book-form-dialog');
    const bookForm = document.getElementById('book-form');
    const cancelBookFormBtn = document.getElementById('cancel-book-form');

    // Open dialog for new book
    newBookBtn.addEventListener('click', () => {
        bookFormDialog.showModal();
    });

    // Cancel book form
    cancelBookFormBtn.addEventListener('click', () => {
        bookFormDialog.close();
    });

    // Submit new book
    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;

        addBookToLibrary(title, author, pages, read);

        // Reset form and close dialog
        bookForm.reset();
        bookFormDialog.close();
    });

    // Delegate event for remove and toggle read buttons
    document.getElementById('library-display').addEventListener('click', (event) => {
        const bookCard = event.target.closest('.book-card');
        if (!bookCard) return;

        const index = bookCard.dataset.index;

        if (event.target.classList.contains('remove-book-btn')) {
            // Remove book
            myLibrary.splice(index, 1);
            displayBooks();
        } else if (event.target.classList.contains('toggle-read-btn')) {
            // Toggle read status
            myLibrary[index].toggleRead();
            displayBooks();
        }
    });

    // Add some initial books for testing
    addBookToLibrary('1984', 'George Orwell', 328, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
});
