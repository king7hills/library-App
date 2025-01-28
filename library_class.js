//
//
// Create Book class which is similar to our book contructor
//
class Book {
    constructor (title, author, read_status, id) {
        this.title = title;
        this.author = author;
        this.read_status = read_status;
        this.id = id;
    }
};
//
// Create Library class which uses our book class and contains all of the 
//functions (now methods) related to a library. This allows for multiple libraries
//moving forward.
//
class Library {
    constructor (name) {
        this.name = name;
        this.data = [];
    }

    libraryDisplay = document.querySelector('div.library_display');

    deleteBook = (event) => {
        event.preventDefault();
        const bookId = event.target.getAttribute('data-book-id');
    
        this.data = this.data.filter(book => book.id != bookId);
    
        const bookElement = document.querySelector(`[data-book-id="${bookId}"]`);
        if (bookElement) {
            bookElement.remove();
        }
    }

    toggleRead = (event) => {
        event.preventDefault();
        const bookId = event.target.getAttribute('data-book-id');
        const bookElement = document.querySelector(`[data-book-id="${bookId}"]`);
        const readSpan = bookElement.querySelector(":nth-child(3)");
    
        const readStatus = this.data.find(book => book.id == bookId);
        if (readStatus) {
            if (readStatus.read_status == 'I have not read it.') {
                readStatus.read_status = 'I read it!';
                readSpan.textContent = 'Read_status: I read it!';
            } else if (readStatus.read_status == 'I read it!') {
                readStatus.read_status = 'I have not read it.';
                readSpan.textContent = 'Read_status: I have not read it.';
            }
        }
    }

    displayBooks = () => {
        this.data.forEach((book) => {
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
            this.deleteBook(event);
        }
    
        const readButton = document.createElement('button');
        readButton.textContent = 'Toggle Read Status';
        readButton.setAttribute('data-book-id', book.id);
        readButton.onclick = function (event) {
            this.toggleRead(event);
        }
    
        p.innerHTML = text;
        p.appendChild(readButton);
        p.appendChild(deleteButton);
        this.libraryDisplay.appendChild(p);
        })
    }

    addLibraryBook = (title, author, read_status, id) => {
        let freshbook = new Book(title, author, read_status, id);
        this.data.push(freshbook);
    
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
            Library.deleteBook(event);
        }
    
        const readButton = document.createElement('button');
        readButton.textContent = 'Toggle Read Status';
        readButton.setAttribute('data-book-id', freshbook.id);
        readButton.onclick = function (event) {
            Library.toggleRead(event);
        }
    
        p.innerHTML = text;
        p.appendChild(readButton);
        p.appendChild(deleteButton);
        this.libraryDisplay.appendChild(p);
    }

    form = document.querySelector('form');

    init = () => {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            formStuff = new FormData(this.form);
            let newTitle = formStuff.get('Title');
            let newAuthor = formStuff.get('Author');
            let newStatus = formStuff.get('Read Yet?');
            let id = this.data.length;
    
            if (newStatus == 'on') {
                newStatus = 'I read it!';
            } else newStatus = 'I have not read it.';
    
            Library.addLibraryBook(newTitle, newAuthor, newStatus, id);
            dialog.close();
            this.form.reset();
        })
    }
};

// Here we use our dialog logic.
const dialog = document.querySelector('dialog');
const newBookButton = document.querySelector('button.library_add');
const closeDialog = document.querySelector('button.dialog_close');

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener('click', () => {
    dialog.close();
});

const myLibrary = new Library ('myLibrary');

myLibrary.init();

myLibrary.addLibraryBook('Extreme Ownership', 'Jocko Willink', 'I have read it!', myLibrary.data.length);
myLibrary.addLibraryBook('Thinking Fast and Slow', 'Daniel Khanneman', 'I have not read it.', myLibrary.data.length);
