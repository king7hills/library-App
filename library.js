const myLibrary = [];

function Book(title, author, read_status) {
    this.title = title;
    this.author = author;
    this.read_status = read_status;
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

const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formStuff = new FormData(form);
    let newTitle = formStuff.get('Title');
    let newAuthor = formStuff.get('Author');
    let newStatus = formStuff.get('Read Yet?');

    if (newStatus == 'on') {
        newStatus = 'I read it!';
    } else newStatus = 'I have not read it.';
        
    addLibraryBook(newTitle, newAuthor, newStatus);
    dialog.close();
    form.reset();
});


// let newTitle = document.querySelector('input#title');
//     let newAuthor = document.querySelector('input#author');
//     let newStatus = document.querySelector('input#read_status');