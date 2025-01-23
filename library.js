const myLibrary = [];

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
        text += x + ': ' + book[x] + "<br>";
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
    deleteButton.setAttribute('data-book-id', book.id);
    deleteButton.onclick = function (event) {
        deleteBook(event);
    }

    p.innerHTML = text;
    p.appendChild(deleteButton);
    libraryDisplay.appendChild(p);
})};

function addLibraryBook (title, author, read_status, id) {
    let freshbook = new Book(title, author, read_status, id);
    myLibrary.push(freshbook);

    //Must create new element EACH TIME function is run
    const p = document.createElement('p');
    p.setAttribute('data-book-id', book.id);
    p.classList.add("book_entry");
    let text = '';
    for (let x in freshbook) {
        text += x + ': ' + freshbook[x] + "<br>";
    };
   
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
    deleteButton.setAttribute('data-book-id', book.id);
    deleteButton.onclick = function (event) {
        deleteBook(event);
    }

    p.innerHTML = text;
    p.appendChild(deleteButton);
    libraryDisplay.appendChild(p);
};

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

function removeDOM () {
    
}