
let myLibrary = [
	{
		id: 1,
		title: "中級から学ぶ日本語",
		author: "KENKYUSHA",
		pages: 144,
		read: true,
	},
	{
		id: 2,
		title: "The Road to React",
		author: "Robin Wieruch",
		pages: 250,
		read: false,
	},
	{
		id: 3,
		title: "よつばと！",
		author: "Kiyohiko Azuma",
		pages: 1000,
		read: true,
	},
];

class Library {
	constructor() {

		this.template = document.getElementById('book-card-template')

		// for passing values to handleBookForm
		this.title = document.querySelector("#book_title");
		this.author = document.querySelector("#book_author");
		this.pages = document.querySelector("#book_pages");
		this.read = document.getElementsByName('status');

		// for eventListeners
		this.bookDisplay = document.querySelector('.book-display')
		this.form = document.querySelector("#bookForm");
		this.renderBtn = document.getElementById('renderBtn');
	}

	// i tried searching, on where to actually put eventListeners
	// this one initialize a listener
	initListeners() {
		this.form.addEventListener('submit', this.handleBookForm);
		this.renderBtn.addEventListener('click', this.renderBookCard);
		this.bookDisplay.addEventListener('click', (event) => {
			if (event.target.matches('.read-btn')) {
				this.toggleBookRead(event)
			}
		});
		this.bookDisplay.addEventListener('click', (event) => {
			if (event.target.matches('.remove-btn')) {
				this.deleteBook(event)
			}
		})
	}

	handleBookForm = (event) => {
		event.preventDefault();

		const checkedRadio = document.querySelector('.status')
		const readValue = checkedRadio.checked ? true : false;

		const newBookObj = {
			id: crypto.randomUUID(), // i just need to add this here, instead up in the constructor
			title: this.title.value,
			author: this.author.value,
			pages: this.pages.value,
			read: readValue,
		};

		console.log(newBookObj);

		myLibrary.push(newBookObj);
		this.renderBookCard();
		this.form.reset();

	}

	renderBookCard = () => {

		myLibrary.forEach((book) => {

			// idk if i should use id or data-book-id 
			if (document.getElementById(book.id)) {
				return;
			}

			const readStatus = book.read ? "Yes, I have!" : "Nawp, not yet"

			// this is actually already reusable
			const clone = this.template.content.cloneNode(true)
			const bookCardDiv = clone.querySelector('.book-card');
			bookCardDiv.setAttribute('id', book.id)

			clone.querySelector('.book-title').textContent = book.title;
			clone.querySelector('.book-author').textContent = book.author
			clone.querySelector('.book-pages').textContent = book.pages;
			clone.querySelector('.book-status').textContent = `Read Status: ${readStatus}`;

			const removeBtn = clone.querySelector('.remove-btn');
			removeBtn.setAttribute('data-book-id', book.id)
			const readBtn = clone.querySelector('.read-btn');
			readBtn.setAttribute('data-book-id', book.id)

			this.bookDisplay.append(clone);
		})


	}

	toggleBookRead = (event) => {
		const btn = event.target.closest('.read-btn')
		const id = btn.dataset.bookId;

		const book = myLibrary.find((book) => book.id === id);
		if (book) {
			book.read = !book.read;

			const readStatus = book.read ? "Yes, I have!" : "Nawp, Not yet"
			const bookCard = document.getElementById(id);
			bookCard.querySelector('.book-status').textContent = `Read Status: ${readStatus}`;
			console.log(readStatus);
		}
	}

	// working deleteBook
	deleteBook = (event) => {
		const removeBtn = event.target.closest(".remove-btn");
		if (!removeBtn) return;

		const id = removeBtn.dataset.bookId;
		const toBeDeletedBook = document.getElementById(id);

		const bookExist = myLibrary.some((book) => book.id === id);
		if (bookExist) {
			toBeDeletedBook.style.display = "none";
			myLibrary = myLibrary.filter((book) => book.id !== id);
		}
	}
}

const mylib = new Library();
mylib.renderBookCard();
mylib.initListeners();
