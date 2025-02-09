// Global settings

let myLibrary = [];

function Book(title, author, read_status, id) {
    this.title = title;
    this.author = author;
    this.read_status = read_status;
    this.id = id;
};

const book1 = new Book('Extreme Ownership', 'Jocko Willink', 'I have read it!', myLibrary.length);
myLibrary.push(book1);

const book2 = new Book('Thinking Fast and Slow', 'Daniel Khanneman', 'I have not read it.', myLibrary.length);
myLibrary.push(book2);

const libraryDisplay = document.querySelector('div.library_display');

// Add existing books to display
function displayBooks () {
    myLibrary.forEach((book) => {
    const p = document.createElement('p');
    p.setAttribute('data-book-id', book.id);
    p.classList.add("book_entry");

    let text = '';
    for (let x in book) {
        text += "<span>" + x + ': ' + book[x] + "</span>";
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
    deleteButton.setAttribute('data-book-id', book.id);
    deleteButton.onclick = function (event) {
        deleteBook(event);
    }

    const readButton = document.createElement('button');
    readButton.textContent = 'Toggle Read Status';
    readButton.setAttribute('data-book-id', book.id);
    readButton.onclick = function (event) {
        toggleRead(event);
    }

    p.innerHTML = text;
    p.appendChild(readButton);
    p.appendChild(deleteButton);
    libraryDisplay.appendChild(p);
})};


// Add books.
function addLibraryBook (title, author, read_status, id) {
    let freshbook = new Book(title, author, read_status, id);
    myLibrary.push(freshbook);

    //Must create new element EACH TIME function is run
    const p = document.createElement('p');
    p.setAttribute('data-book-id', freshbook.id);
    p.classList.add("book_entry");
    let text = '';
    for (let x in freshbook) {
        text += "<span>" + x + ': ' + freshbook[x] + "</span>";
    };
   
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
    deleteButton.setAttribute('data-book-id', freshbook.id);
    deleteButton.onclick = function (event) {
        deleteBook(event);
    }

    const readButton = document.createElement('button');
    readButton.textContent = 'Toggle Read Status';
    readButton.setAttribute('data-book-id', freshbook.id);
    readButton.onclick = function (event) {
        toggleRead(event);
    }

    p.innerHTML = text;
    p.appendChild(readButton);
    p.appendChild(deleteButton);
    libraryDisplay.appendChild(p);
};

function deleteBook (event) {
    event.preventDefault();
    const bookId = event.target.getAttribute('data-book-id');

    myLibrary = myLibrary.filter(book => book.id != bookId);

    const bookElement = document.querySelector(`[data-book-id="${bookId}"]`);
    if (bookElement) {
        bookElement.remove();
    }
};

function toggleRead (event) {
    event.preventDefault();
    const bookId = event.target.getAttribute('data-book-id');
    const bookElement = document.querySelector(`[data-book-id="${bookId}"]`);
    const readSpan = bookElement.querySelector(":nth-child(3)");

    const readStatus = myLibrary.find(book => book.id == bookId);
    if (readStatus) {
        if (readStatus.read_status == 'I have not read it.') {
            readStatus.read_status = 'I read it!';
            readSpan.textContent = 'Read_status: I read it!';
        } else if (readStatus.read_status == 'I read it!') {
            readStatus.read_status = 'I have not read it.';
            readSpan.textContent = 'Read_status: I have not read it.';
        }
    }
};

// Dialog and entry functionality
const dialog = document.querySelector('dialog');
const newBookButton = document.querySelector('button.library_add');
const closeDialog = document.querySelector('button.dialog_close');

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener('click', () => {
    dialog.close();
});

const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formStuff = new FormData(form);
    let newTitle = formStuff.get('Title');
    let newAuthor = formStuff.get('Author');
    let newStatus = formStuff.get('Read Yet?');
    let id = myLibrary.length;

    if (newStatus == 'on') {
        newStatus = 'I read it!';
    } else newStatus = 'I have not read it.';
        
    addLibraryBook(newTitle, newAuthor, newStatus, id);
    dialog.close();
    form.reset();
});

displayBooks();