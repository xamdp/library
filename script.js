const myLibrary = [
	// {
	// 	title: "Harry Potter",
	// 	author: "J.K Rowling",
	// },
	// {
	// 	title: "The Road to React",
	// 	author: "Robin Wieruch",
	// },
];

// Book constructor for making book objects
function Book(title, author, pages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.id = crypto.randomUUID(); // book objs should have unique id
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.addBookTo = function() {
		return `${this.id} ${this.title} ${this.author} ${this.pages}  ${this.read}`;
	};
}

const bookForm = document.querySelector("#bookForm");
bookForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const bookTitle = document.querySelector("#book_title").value;
	const bookAuthor = document.querySelector("#book_author").value;
	const bookPages = document.querySelector("#book_pages").value;
	const bookStatus = document.querySelector(
		'input[name="status"]:checked',
	).value;

	const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
	myLibrary.push(newBook);
});

// this is partially working, but should display book info in a book card element or something
// basically i need to create new elements under .book-card

function showBooks() {
	myLibrary.forEach((book) => {
		const bookdisplay = document.querySelector(".book-display");
		const bookCard = document.createElement("div");
		const title = document.createElement("p");
		title.textContent = book.title;

		const author = document.createElement("p");
		author.textContent = book.author;
		bookCard.classList.add("book-card");

		bookdisplay.appendChild(bookCard);
		bookCard.append(title, author);
	});
}
