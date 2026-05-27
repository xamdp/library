const myLibrary = [
	{
		id: 1,
		title: "Harry Potter",
		author: "J.K Rowling",
		pages: 150,
	},
	{
		id: 2,
		title: "The Road to React",
		author: "Robin Wieruch",
		pages: 200,
	},
];

// Book constructor for making book objects
function Book(id, title, author, pages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.id = id; // book objs should have unique id
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.addBookTo = function() {
		return `${this.id} ${this.title} ${this.author} ${this.pages} ${this.read}`;
	};
}

const bookForm = document.querySelector("#bookForm");
bookForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const bookId = crypto.randomUUID();
	const bookTitle = document.querySelector("#book_title").value;
	const bookAuthor = document.querySelector("#book_author").value;
	const bookPages = document.querySelector("#book_pages").value;
	const bookStatus = document.querySelector(
		'input[name="status"]:checked',
	).value;

	const newBook = new Book(
		bookId,
		bookTitle,
		bookAuthor,
		bookPages,
		bookStatus,
	);
	myLibrary.push(newBook);
});

// this is partially working, but should display book info in a book card element or something
// basically i need to create new elements under .book-card

function showBooks() {
	const bookdisplay = document.querySelector(".book-display");
	myLibrary.forEach((book) => {
		// i found out that if i click the My books it creates another exising book card.
		if (document.getElementById(book.id)) {
			return;
		}

		// create book card
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card");
		bookCard.setAttribute("id", book.id);

		bookdisplay.appendChild(bookCard);

		// create title p tag
		const book_title = document.createElement("p");
		book_title.classList.add("book-title");
		book_title.textContent += book.title;

		// create author p tag
		const book_author = document.createElement("p");
		book_author.classList.add("book-author");
		book_author.textContent += book.author;

		// create book pages p tag
		const book_pages = document.createElement("p");
		book_pages.classList.add("book-pages");
		book_pages.textContent += book.pages;

		// create read status
		const book_status = document.createElement("p");
		book_status.classList.add("book_status");
		book_status.textContent += book.read;

		bookCard.append(book_title, book_author, book_pages, book_status);
	});
	console.log(myLibrary);
}

// display dummy books initially
showBooks();
