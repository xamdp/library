
class Library {
	constructor() {

		this.template = document.getElementById('book-card-template')
		this.bookDisplay = document.querySelector('.book-display')
		this.form = document.querySelector("#bookForm");

		this.id = crypto.randomUUID();
		this.title = document.querySelector("#book_title");
		this.author = document.querySelector("#book_author");
		this.pages = document.querySelector("#book_pages");
		this.read = document.getElementsByName('status');

		this.renderBtn = document.getElementById('renderBtn');


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
	}

	// while this one, removes, idk yet, when to call this
	stopListeners() {
		this.form.removeEventListener('submit', this.handleBookForm)
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
			notYetcard.querySelector('.book-status').textContent = book.read;

			const removeBtn = notYetcard.querySelector('.remove-btn');
			removeBtn.setAttribute('data-book-id', book.id)
			const readBtn = notYetcard.querySelector('.read-btn');
			readBtn.setAttribute('data-book-id', book.id)

			this.bookDisplay.append(notYetcard);
		})

	}

	deleteBook() { }


}

const mylib = new Library();
mylib.renderBookCard();
mylib.initListeners();
