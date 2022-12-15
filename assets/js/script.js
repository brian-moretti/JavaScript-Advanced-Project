// CODE -> INTRO PAGE //

const intro = document.getElementById("intro");

let introPhrase = document.createElement("h2");
    introPhrase.innerHTML = "\"La lettura è quell'isola dove approdano tutti i sognatori.\"";
    intro.append(introPhrase);

let btnIntro = document.createElement("button");
    btnIntro.setAttribute("id", "btnIntro");
    btnIntro.setAttribute("type", "submit");
    intro.append(btnIntro);

let iconBtn = document.createElement("img");
    iconBtn.setAttribute("src", "/assets/images/open-book.png");
    iconBtn.setAttribute("width", "50px");
    btnIntro.append(iconBtn);

btnIntro.addEventListener("click", () => {
    intro.style.display = "none";
    searchBox.style.display = "flex";
});

// CODE --> TEXTBOX PAGE // 

const searchBox = document.getElementById("searchBox");

let searchPhrase = document.createElement("h2");
    searchPhrase.innerHTML = "Choose Wisely...";
    searchBox.append(searchPhrase);

let form = document.createElement("form");
    form.setAttribute("name", "box");
    form.setAttribute("onsubmit", "showBooks(); return false");


let labelInput = document.createElement("label");
    labelInput.setAttribute("id","labelInput");
    labelInput.setAttribute("for","category");
    labelInput.innerHTML = "Let's try \"Fantasy\" ";
    form.append(labelInput);

let inputForm = document.createElement("input");
    inputForm.setAttribute("id", "category");
    inputForm.setAttribute("type", "text");
    inputForm.setAttribute("placeholder", "Write a Category...");
    inputForm.setAttribute("required", true);
    inputForm.setAttribute("autocomplete", "off");
    form.append(inputForm);

let inputBtn = document.createElement("button");
    inputBtn.setAttribute("type","submit");
    inputBtn.setAttribute("id","inputBtn");
    inputBtn.setAttribute("value","");
    inputBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    form.append(inputBtn);


    searchBox.append(form);

inputForm.addEventListener(
    "focusin", () => { labelInput.style.visibility = "visible" });

inputForm.addEventListener(
    "focusout", () => { labelInput.style.visibility = "hidden" });

// CODE --> BOOKS RESULTS //

let result = document.getElementById("books");
let back = document.createElement("button");
let noFound = document.createElement("h3");
noFound.classList.add("notFound");

function lowerString(string){
    return string.toLowerCase();
};

async function jsonFetch(url){
    const response = await fetch(url);
    return await response.json();
};

function showBooks(){

    searchBox.style.display = "none";

    back.innerHTML = `<i class="fa-solid fa-angles-left"></i>`;
    back.classList.add("back");
    document.body.append(back);

    let category = lowerString(inputForm.value);

    jsonFetch(`https://openlibrary.org/subjects/${category}.json`)

    /*fetch(`https://openlibrary.org/subjects/${category}.json`)
    .then(response => response.json())*/

    .then(data => {
        console.log(data)
        let books = "";
        let Data = data.works
        if(Data.length > 0){
         for(let book of Data){
            result.style.display = "flex";
          books += `
            <div class="singleBook" data-book="${book.key}">
            <h2 id="title">${book.title}</h2>
            <img src=${"https://covers.openlibrary.org/b/id/" + book.cover_id + "-M.jpg"} alt="${book.title}">
            <h5>${book.authors[0].name}</h5>
            <p id="description"></p>
            </div>
            `
            result.innerHTML = books
        }
    } else {
        document.body.append(noFound);
        noFound.style.display = "block";
        noFound.innerHTML = "Ops, the category of books you are looking for doesn't exist." + "<br/>" + " Please go back to the \"Search Box\" and try other category."
    }
    })
};

back.addEventListener("click", () => {
    result.style.display = "none";
    searchBox.style.display = "flex";
    noFound.style.display = "none";
});

// CODE --> CHOOSEN BOOK //

const bookContainer = document.getElementById("bookContainer");
const modal = document.getElementById("modal");

let box1 = document.createElement("div");
    let imageBook = document.createElement("img");
    let authorBook = document.createElement("h5");
    box1.append(imageBook, authorBook);

let box2 = document.createElement("div");
    let titleBook = document.createElement("h2");
    let infoBook = document.createElement("p");
    box2.append(titleBook, infoBook);

let closeBnt = document.createElement("span");
    box1.classList.add("detail-1");
    box2.classList.add("detail-2");
    closeBnt.classList.add("cross");
    closeBnt.innerHTML = "&times;"


    modal.append(box1, box2, closeBnt);

result.addEventListener("click", showDetails);

function showDetails(e){
    let choosen = e.target.closest("div");
    if(choosen.className != "singleBook") return
    chooseBook()

    bookContainer.classList.add("no-overscroll");

    let keyBook = choosen.dataset.book;

    jsonFetch(`https://openlibrary.org${keyBook}.json`)
    /*fetch(`https://openlibrary.org${keyBook}.json`)
    .then(response => response.json())*/
    .then(data => {
        titleBook.innerHTML = data.title;

        if(!(data.covers)){
            imageBook.src = "";
            imageBook.alt = "Image not Found :("
        } else {
        imageBook.src = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
        }

        jsonFetch(`https://openlibrary.org${data.authors[0].author.key}.json`)
        /*fetch(`https://openlibrary.org${data.authors[0].author.key}.json`)
            .then(response => response.json())*/
            .then(data => {
                authorBook.innerHTML = data.name
        })

        if( !(data.description) ){
            infoBook.innerHTML = "Description not found :( "
        } else if (data.description.value === undefined){
            infoBook.innerHTML = data.description
        } else {
            infoBook.innerHTML = data.description.value
        };
    })
};

function chooseBook(){
    if(bookContainer.hasAttribute("hidden")){
        bookContainer.removeAttribute("hidden");
    }
};

closeBnt.addEventListener("click", () => {
    if(!(bookContainer.hasAttribute("hidden"))){
        bookContainer.setAttribute("hidden", true)
    } else {
        bookContainer.removeAttribute("hidden");
    }
});