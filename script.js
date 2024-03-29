function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

let library = [];

function addBookToLibrary(book) {
  library.push(book);
}

function removeBookFromLibrary(title) {
  library = library.filter((book) => book.title !== title);
}

// DOM elements
const bookGrid = document.getElementById("bookGrid");
const addBtn = document.getElementById("addBtn");
const addBookModal = document.getElementById("addBookModal");
const overlay = document.getElementById("overlay");

function createBookGrid(library) {
  resetGrid();
  for (const book of library) {
    createBookCard(book);
  }
  setBtns();
}

function resetGrid() {
  bookGrid.innerHTML = "";
}

function createBookCard(book) {
  newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute('data-index', library.indexOf(book));

  newTitle = document.createElement("p");
  newTitle.classList.add("title");
  newTitle.innerText = book.title;
  newAuthor = document.createElement("p");
  newAuthor.classList.add("author");
  newAuthor.innerText = book.author;
  newPages = document.createElement("p");
  newPages.classList.add("pages");
  newPages.innerText = `${book.pages} pages`;
  newIsRead = document.createElement("button");
  newIsRead.classList.add("btn-read", "btn");
  if (book.isRead) {
    newIsRead.innerText = "read";
    newIsRead.classList.add("read");
  } else {
    newIsRead.innerText = "unread";
    newIsRead.classList.add("unread");
  }
  newDelete = document.createElement("button");
  newDelete.classList.add("btn-delete", "btn");
  newDelete.innerText = "delete";

  newCard.appendChild(newTitle);
  newCard.appendChild(newAuthor);
  newCard.appendChild(newPages);
  newCard.appendChild(newIsRead);
  newCard.appendChild(newDelete);

  bookGrid.appendChild(newCard);
}

function setBtns() {
  // delete buttons
  let deleteBtns = document.querySelectorAll(".btn-delete");
  deleteBtns.forEach((button) => {
    button.addEventListener("click", (e) => deleteBook(button))
    })
  
  // unread buttons
  let readBtns = document.querySelectorAll(".btn-read");
  readBtns.forEach((button) => {
    button.addEventListener("click", (e) => toggleRead(button));
  })
}

// input
const addBookForm = document.getElementById("addBookForm");
const titleField = document.getElementById("bookTitle");
const authorField = document.getElementById("bookAuthor");
const pagesField = document.getElementById("bookPages");
const readField = document.getElementById("isReadBox");
const submitBtn = document.getElementById("submitBtn");

function createBook() {
  const newBook = new Book(
    titleField.value,
    authorField.value,
    pagesField.value,
    readField.checked
  );
  addBookToLibrary(newBook);
  createBookGrid(library);
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createBook();
  closeModals();
  addBookForm.reset();
});

function deleteBook(button) {
  let bookIndex = button.parentElement.dataset.index;
  removeBookFromLibrary(library[bookIndex].title);
  createBookGrid(library);
}

function toggleRead(button) {
  if (button.classList.contains("unread")) {
    button.classList.remove("unread");
    button.classList.add("read");
    button.innerText = "read";
  } else if (button.classList.contains("read")) {
    button.classList.remove("read");
    button.classList.add("unread");
    button.innerText = "unread";
  }
}

// modal

function closeModals() {
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
}

function openModals() {
  addBookModal.classList.add("active");
  overlay.classList.add("active");
}

addBtn.addEventListener("click", () => {
  openModals();
});

overlay.addEventListener("click", (e) => {
  if (!addBookModal.contains(e.target)) {
    closeModals();
  }
});

// tests

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
// const hitchhikersGuide = new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 183, true);

// addBookToLibrary(theHobbit);
// console.log(library);
// addBookToLibrary(hitchhikersGuide);
// console.log(library);
// createBookGrid(library);
