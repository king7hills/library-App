const myLibrary = [];

function Book(title, author, read_status) {
    this.title = title;
    this.author = author;
    this.readStatus = read_status;
};

const libraryDisplay = document.querySelector('div.library_display');


const book1 = new Book('Extreme Ownership', 'Jocko Willink', 'read');
myLibrary.push(book1);

function addLibraryBook (title, author, read_status) {
    let freshbook = new Book(title, author, read_status);
    myLibrary.push(freshbook);

    //Must create new element EACH TIME function is run
    const p = document.createElement('p');
    libraryDisplay.appendChild(p);
    let text = '';
    for (let x in freshbook) {
        text += x + ': ' + freshbook[x] + " ";
    };
    p.textContent = text;
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

const addBook = document.querySelector('button#add_book_submit');

addBook.addEventListener("submit", (e) => {

    let newTitle = document.querySelector('input#title');
    let newAuthor = document.querySelector('input#author');
    let newStatus = document.querySelector('input#read_status');
    addLibraryBook(newTitle, newAuthor, newStatus);
});