
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

class Library {
	constructor(id, title, author, pages, read) {
		if (!new.target) {
			throw Error("You must use thee 'new' operator to call the constructor.")
		}

		this.id = id;
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.addBookto = function() {
			return `${this.id} ${this.title} ${this.author} ${this.pages} ${this.read}`;
		}
	}

	// class methods
	createBookCard() { }
	showBooks() { }
	deleteBook() { }


}
