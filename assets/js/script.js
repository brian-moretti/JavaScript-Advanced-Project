// VARIABLES //

const header = document.getElementById("header");

const logo = createElement("img", "", header, {
  src: "/assets/images/favicon.svg",
  alt: "man reading a book",
  width: "100px",
});

const title = createElement("h1", "The Book Camp", header);

const main = document.getElementById("main");
const formContainer = document.getElementById("formContainer");

const form = createElement("form", "", formContainer, {
  id: "form",
  name: "searchBook",
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showBooks();
});

const label = createElement(
  "label",
  '"Reading is that island where all dreamers land."',
  form,
  {
    id: "labelInput",
    for: "category",
  }
);

const input = createElement("input", "", form, {
  type: "text",
  id: "category",
  placeholder: "Write a Category...",
  required: true,
  autocomplete: "off",
});

input.addEventListener("focusin", () => {
  label.style.visibility = "visible";
});

input.addEventListener("focusout", () => {
  label.style.visibility = "hidden";
});

const button = createElement(
  "button",
  '<i class="fa-solid fa-magnifying-glass"></i>',
  form,
  {
    id: "inputBtn",
    type: "submit",
  }
);

const result = document.getElementById("books");
const bookContainer = document.getElementById("bookContainer");

const footer = document.getElementById("footer");
const date = new Date();
const footerContainer = createElement("div", "", footer, {
  id: "footerContainer",
});

const copyright = createElement(
  "h3",
  `&copy; Copyright ${date.getFullYear()} - 
    <a href="https://github.com/brian-moretti" target="_blank" rel="noopener noreferrer">
    <i class="fa-brands fa-github"></i></a>`,
  footerContainer
);

const identity = createElement(
  "h3",
  `Developed & Designed with 
    <i class="fa-solid fa-code"></i> and <i class="fa-solid fa-heart"></i> 
    by <a href="https://brian-moretti.github.io/" target="_blank">Brian Moretti</a>`,
  footerContainer
);

// FUNCTIONS //

function createElement(tag, text, appendTo, attributes) {
  let element = document.createElement(tag);
  element.innerHTML = text;
  appendTo.append(element);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

function searchString(string) {
  return string.toLowerCase().trim().split(" ").join("_");
}

async function jsonFetch(url) {
  const response = await fetch(url);
  return await response.json();
}

function showBooks() {
  let search = searchString(input.value);
  jsonFetch(`https://openlibrary.org/subjects/${search}.json`)
    .finally(() => {
      result.innerHTML = "";
      result.classList.remove("notFound");
    })
    .then((data) => {
      console.log(data);
      let books = "";
      let Data = data.works;
      if (Data.length > 0) {
        for (let book of Data) {
          result.classList.remove("notFound");
          result.style.display = "flex";
          books += `
                    <div class="singleBook" data-book="${book.key}">
                    <h2 id="title">${book.title}</h2>
                    <img src=${
                      "https://covers.openlibrary.org/b/id/" +
                      book.cover_id +
                      "-M.jpg"
                    } alt="${book.title}">
                    <h5>${book.authors[0].name}</h5>
                    <p id="description"></p>
                    </div>
                    `;
          result.innerHTML = books;
        }
      } else {
        result.style.display = "block";
        result.classList.add("notFound");
        result.innerHTML = `<h3> Ops, the category of books you are looking for doesn't exist.<br/>Please try another category<h3>`;
      }
    })
    .catch((err) => {
      alert(err.message);
      console.log(err.message);
    });
}

function chooseBook() {
  if (bookContainer.hasAttribute("hidden")) {
    bookContainer.removeAttribute("hidden");
  }
}

result.addEventListener("click", details);

function details(e) {
  const choosen = e.target.closest("div");
  if (choosen.className != "singleBook") return;
  chooseBook();

  let keyBook = choosen.dataset.book;

  const modal = createElement("div", "", bookContainer, { id: "modal" });
  const box1 = createElement("div", "", modal, {
    class: "detail-1",
  });

  const box2 = createElement("div", "", modal, {
    class: "detail-2",
  });

  const imageBook = createElement("img", "", box1);
  const authorBook = createElement("h5", "", box1);
  const titleBook = createElement("h2", "", box2);
  const infoBook = createElement("p", "", box2);
  const closeBnt = createElement("span", "&times;", modal, {
    class: "cross",
  });

  modal.classList.add("no-overscroll");

  jsonFetch(`https://openlibrary.org${keyBook}.json`)
    .then((data) => {
      titleBook.innerHTML = data.title;

      if (!data.covers) {
        imageBook.src = "";
        imageBook.alt = "Image not Found :(";
      } else {
        imageBook.src = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`;
      }

      jsonFetch(`https://openlibrary.org${data.authors[0].author.key}.json`)
        .then((data) => {
          authorBook.innerHTML = data.name;
        })
        .catch((err) => {
          alert(err.message);
          console.log(err.message);
        });

      if (!data.description) {
        infoBook.innerHTML = "Description not found :( ";
      } else if (data.description.value === undefined) {
        infoBook.innerHTML = data.description;
      } else {
        infoBook.innerHTML = data.description.value;
      }
    })
    .catch((err) => {
      console.log(err.message);
      alert(err.message);
    });

  closeBnt.addEventListener("click", () => {
    if (!bookContainer.hasAttribute("hidden")) {
      bookContainer.setAttribute("hidden", true);
      modal.remove();
    } else {
      bookContainer.removeAttribute("hidden");
    }
  });
}

function addEvent(element, eventType, eventFunct) {
  element.addEventListener(eventType, eventFunct);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    bookContainer.setAttribute("hidden", true);
    modal.remove();
  }
});

bookContainer.addEventListener("click", (e) => {
  if (e.target == bookContainer) {
    bookContainer.setAttribute("hidden", true);
    modal.remove();
  }
});
