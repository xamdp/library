// changed it to let, so i can overwrite the array
let myLibrary = [
	{
		id: 1,
		title: "中級から学ぶ日本語",
		author: "KENKYUSHA",
		pages: 144,
		read: "Yes, I have!",
	},
	{
		id: 2,
		title: "The Road to React",
		author: "Robin Wieruch",
		pages: 250,
		read: "Nawp, Not yet",
	},
	{
		id: 3,
		title: "よつばと！",
		author: "Kiyohiko Azuma",
		pages: 1000,
		read: "Yes, I have!",
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
	// this.toggleRead = function() {
	// 	this.read = !this.read;
	// };
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
	resetForm();
	showBooks();
});

// this is partially working, but should display book info in a book card element or something
// basically i need to create new elements under .book-card

function createBookCard() {
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

		// create div for page and pageicon
		const pagesContainer = document.createElement("div");
		pagesContainer.classList.add("pages-container");

		// create book pages p tag
		const book_pages = document.createElement("p");
		book_pages.classList.add("book-pages");
		book_pages.textContent += book.pages;

		// function for creating the svg
		let icon = createIcons();
		pagesContainer.append(icon, book_pages);

		// create read status p tag
		const book_status = document.createElement("p");
		book_status.classList.add("book-status");
		book_status.setAttribute("data-book-id", book.id);

		book_status.textContent = `Read Status: ${book.read}`;

		// create container for remove and read button
		const buttonContainer = document.createElement("div");
		buttonContainer.classList.add("btns-container");

		// creates remove-btn
		const removeButton = document.createElement("button");
		removeButton.classList.add("remove-btn");
		removeButton.textContent = "Remove Book";
		removeButton.setAttribute("data-book-id", book.id);

		// creates read-btn
		const readButton = document.createElement("button");
		readButton.classList.add("read-btn");
		readButton.textContent += "Read / Not yet";
		readButton.setAttribute("data-book-id", book.id);

		buttonContainer.append(readButton, removeButton);

		bookCard.append(
			book_title,
			book_author,
			pagesContainer,
			book_status,
			buttonContainer,
		);
	});
}

function showBooks() {
	createBookCard();
	console.log(myLibrary);
}

// i put showBooks here, that way I can delete the created book cards
showBooks();

// decided to make a separate function, svg takes a lot of space...
function createIcons() {
	const pageSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text-icon lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>`;

	const pageIcon = document.createElement("svg");
	pageIcon.innerHTML = pageSvg;
	return pageIcon;
}

// i noticed that if i do two delegation events, in a single container, it produces
// error for the other eventlistener

// delete a book from library, does not delete explicit dummy data in myLibrary
const bookContainer = document.querySelector(".book-display");
bookContainer.addEventListener("click", (e) => {
	const removeBtn = e.target.closest(".remove-btn");
	if (!removeBtn) return;

	const dataBookdId = removeBtn.dataset.bookId;

	// maybe i should just query by id and not data
	const bookCard = document.getElementById(dataBookdId);
	// const bookCardID = bookCard.getAttribute("data-book-id");
	const isBookExist = myLibrary.some((book) => book.id === dataBookdId);
	if (isBookExist) {
		bookCard.style.display = "none";

		// so this works, because it overwrites myLibrary
		myLibrary = myLibrary.filter((book) => book.id !== dataBookdId);
	}
});

// i made a mistake, apparently, this is what a Book prototype function is
Book.prototype.toggleRead = function() {
	this.read = !this.read;
};

// toggles read status
bookContainer.addEventListener("click", (e) => {
	const toggleBtn = e.target.closest(".read-btn");
	if (!toggleBtn) return;
	const dataBookId = toggleBtn.dataset.bookId;
	const bookCard = document.getElementById(dataBookId);
	const bookStatus = bookCard.querySelector(
		`.book-status[data-book-id="${dataBookId}"]`,
	);

	// console.log(bookStatus);

	const book = myLibrary.find((book) => book.id === dataBookId);
	if (book) {
		// ffff, so i don't need to append .prototype after the book not like this
		// book.prototype.toggleRead()
		book.toggleRead();

		// maybe i can use icons here, for read status
		const readStatus = book.read ? "Yes, I have!" : "Nawp, Not yet";
		bookStatus.textContent = `Read Status: ${readStatus}`;
		console.log(readStatus);
	}
});

function resetForm() {
	document.getElementById("bookForm").reset();
}
