let StoredBooks = [];
let newBook;

const container = document.querySelector(".container-inner");
const answers_heading = document.querySelector(".answers-heading");
const answers_author = document.querySelector(".answers-author");
const answers_pages = document.querySelector(".answers-pages");
const answers_read = document.querySelector(".answers-read");
const button = document.querySelector("#buttonShowBooks");
const buttonAddBook = document.querySelector("#buttonAddNewBook");
const addTheBook = document.querySelector("#addTheBook");
const formdiv = document.querySelector(".divFirst");
const titleOfBook = document.querySelector("#titleOfBook");
const authorOfBook = document.querySelector("#authorOfBook");
const pagesOfBook = document.querySelector("#pagesOfBook");
const selectedRadio = document.querySelector('input[name="readBook"]:checked');
const authorError = document.querySelector("#authorOfBook + span.error");
const myForm = document.querySelector("#myForm");

//Book constructor
// function Book(id, title, author, pages, read) {
//   this.id = id;
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }


//Using class instead constructor
class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

}





function addBookToLibrary(title, author, pages, read) {
  let UnquieID = window.crypto.randomUUID();
  newBook = new Book(UnquieID, title, author, pages, read);
  StoredBooks.push(newBook);
  // console.log(StoredBooks);
}

function showBooks() {
  container.textContent = "";

  for (const ObjectValues of StoredBooks) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("card");


    function creationOfSection(nameOfSection, valueOfSection, sectionNo) {
      const div1 = document.createElement("div");
      div.appendChild(div1);
      div1.classList.add(`section${sectionNo}`);
      if (sectionNo === 5) {
        const buttonRemoveBook = document.createElement("button");
        buttonRemoveBook.classList.add("removeBook");
        buttonRemoveBook.setAttribute("data-book-id", ObjectValues.id);
        buttonRemoveBook.textContent = "Remove Book";
        div1.appendChild(buttonRemoveBook);

        const buttontooglereadstatus = document.createElement("button");
        buttontooglereadstatus.classList.add("tooglereadstatus");
        buttontooglereadstatus.setAttribute("data-book-id", ObjectValues.id);
        buttontooglereadstatus.textContent = "Toogle Read Status";
        div1.appendChild(buttontooglereadstatus);
        buttontooglereadstatus.addEventListener("click", function () {
          const changeReadStatus = buttontooglereadstatus.dataset.bookId;
          if (ObjectValues.read == "Not Read") {
            const toBeChangedBook = StoredBooks.find(function (item) {
              return item.id === changeReadStatus;
            });
            toBeChangedBook.read = "Read";
            console.log("Toogle change");
            showBooks();
          } else {
            const toBeChangedBook = StoredBooks.find(function (item) {
              return item.id === changeReadStatus;
            });
            toBeChangedBook.read = "Not Read"
            showBooks();
          }
        });

        buttonRemoveBook.addEventListener("click", function () {
          const deleteBookId = buttonRemoveBook.dataset.bookId;
          let NewStoredBooks = StoredBooks.filter(function (book) {
            return book.id != deleteBookId;
          })
          StoredBooks = [];
          StoredBooks = NewStoredBooks;
          showBooks();
        });

      } else {
        const p = document.createElement("p");
        div1.appendChild(p);
        const span = document.createElement("span");
        span.classList.add("headings");
        span.textContent = nameOfSection;
        const span2 = document.createElement("span");
        span2.classList.add("answers");
        span2.textContent = valueOfSection;
        span.appendChild(span2);
        p.appendChild(span);
      }
    }
    creationOfSection("Title : ", ObjectValues.title, 1);
    creationOfSection("Author : ", ObjectValues.author, 2);
    creationOfSection("Pages : ", ObjectValues.pages, 3);
    creationOfSection("Read : ", ObjectValues.read, 4);
    creationOfSection("", "", 5);
  }
}


button.addEventListener("click", function () {
  showBooks();
});
buttonAddBook.addEventListener("click", function () {
  formdiv.classList.remove("divFirst");
  formdiv.classList.add("divFirstVisible");
});

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  if (!authorOfBook.validity.valid) {
    showError();
    authorOfBook.focus();
    return;
  }
  const authorOfBookvalue = authorOfBook.value;
  const titleOfBookvalue = titleOfBook.value;
  const pagesOfBookvalue = pagesOfBook.value;
  const selectedRadio = document.querySelector('input[name="readBook"]:checked');
  if (selectedRadio) {
    const selectedRadioValue = selectedRadio.value;
    addBookToLibrary(titleOfBookvalue, authorOfBookvalue, pagesOfBookvalue, selectedRadioValue);
  }
  titleOfBook.value = "";
  authorOfBook.value = "";
  pagesOfBook.value = "";
  console.log(StoredBooks);
});

//validation for title of the book
titleOfBook.addEventListener("input", () => {
  if (titleOfBook.validity.tooShort) {
    titleOfBook.setCustomValidity("A title should have 5 or more than five words");
  }else{
    titleOfBook.setCustomValidity("");
  }
});

authorOfBook.addEventListener("input", () => {
  if (authorOfBook.validity.valid) {
    authorError.textContent = ""; 
    authorError.classList.remove("active");
  }else{
    showError ();
  }
})


function showError () {
  authorError.textContent = "";
  if (authorOfBook.validity.tooShort) {
    authorError.textContent = "Hey! you reader is this really name of the author";
  } else if (authorOfBook.validity.valueMissing) {
    authorError.textContent = "Fill out twin";
  } else if (authorOfBook.validity.tooLong){
    authorError.textContent = `Come on bro ${authorError.value.length} letters`;
  }
    authorError.classList.add("error", "active");
}
