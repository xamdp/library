
class Library {
	constructor() {

		this.template = document.getElementById('book-card-template')
		this.bookDisplay = document.querySelector('.book-display')

		// these are targettting the elements inside the form, not the elements inside a book card
		this.id = crypto.randomUUID();
		this.title = document.querySelector("#book_title");
		this.author = document.querySelector("#book_author");
		this.pages = document.querySelector("#book_pages");
		this.read = document.getElementsByName('status');

		this.form = document.querySelector("#bookForm");
		this.renderBtn = document.getElementById('renderBtn');
		this.readBtn = document.querySelector('.read-btn');
		this.bookStatus = document.querySelector('.book-status')


		// the library array itself is moved inside the constructor
		this.myLibrary = [
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
	}

	// what this does, both listeners are stop at the end of handle event listeners.
	stopListeners() {
		this.form.removeEventListener('submit', this.handleBookForm)
		this.renderBtn.removeEventListener('click', this.renderBookCard);
	}

	handleBookForm = (event) => {
		event.preventDefault();

		const checkedRadio = document.querySelector(
			'input[name="status"]:checked')

		const readValue = checkedRadio ? checkedRadio.value : 'not read';

		const newBookObj = {
			id: this.id,
			title: this.title.value,
			author: this.author.value,
			pages: this.pages.value,
			read: readValue,
		};

		console.log(newBookObj);

		this.myLibrary.push(newBookObj);
		this.renderBookCard();
		this.form.reset();

	}


	// class methods
	renderBookCard = () => {

		this.myLibrary.forEach((book) => {

			// idk if i should use id or data-book-id 
			if (document.getElementById(book.id)) {
				return;
			}

			const notYetcard = this.template.content.cloneNode(true)
			const bookCardDiv = notYetcard.querySelector('.book-card');
			bookCardDiv.setAttribute('id', book.id)

			notYetcard.querySelector('.book-title').textContent = book.title;
			notYetcard.querySelector('.book-author').textContent = book.author
			notYetcard.querySelector('.book-pages').textContent = book.pages;
			notYetcard.querySelector('.book-status').textContent = `Read Status: ${book.read}`;

			const removeBtn = notYetcard.querySelector('.remove-btn');
			removeBtn.setAttribute('data-book-id', book.id)
			const readBtn = notYetcard.querySelector('.read-btn');
			readBtn.setAttribute('data-book-id', book.id)

			this.bookDisplay.append(notYetcard);
		})


	}

	toggleBookRead = (event) => {
		const btn = event.target.closest('.read-btn')
		const id = btn.dataset.bookId;
		// const bookCard = document.getElementById(id);
		// const bookStatus = bookCard.querySelector(`.book-status[data-book-id="${id}"]`)

		const book = this.myLibrary.find((book) => book.id === id);
		if (book) {
			book.read = !book.read;

			const readStatus = book.read ? "Yes, I have!" : "Nawp, Not yet"
			const bookCard = document.getElementById(id);
			bookCard.querySelector('.book-status').textContent = `Read Status: ${readStatus}`;
			console.log(readStatus);
		}
	}

	deleteBook = () => {

	}


}

const mylib = new Library();
mylib.renderBookCard();
mylib.initListeners();
