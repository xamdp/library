const myLibrary = [];

function Book(title, author, date, pages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.title = title;
	this.author = author;
	this.date = date;
	this.pages = pages;
	this.read = read;
	this.addBookTo = function() {
		return `${this.title} ${this.author} ${this.date} ${this.pages}  ${this.read}`;
	};
}

// Book.prototype.addBookTo = function() {
// 	console.log(`${this.title}`);
// };

// this is a sample object, to visualize how will i add eventlistener for passing arguments from dialog or modal to
// addBookToLibrary.
let book = new Book("Minna No Nihongo", "先生", "Today", 296, "not yet");

// Object.getPrototypeOf(thisbook);
// let val = thisbook.addBookTo();
// console.log(val);

function addBookToLibrary(title, author, date, pages, read) {
	let book = new Book(title, author, date, pages, read);
	myLibrary.push(book);
	// take params, create a book then store it in the array
}
