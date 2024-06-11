let arr = [];
let category = document.getElementById("category");
let des = document.getElementById("des");
let desarr = [];
let popup = document.getElementById("popup");
let popupContent = document.querySelector(".popup-body");
let closeBtn = document.querySelector(".close");

async function fetchCategoryList() {
  try {
    let res = await fetch("https://books-backend.p.goit.global/books/category-list");
    arr = await res.json();
    console.log(arr);
    arr.forEach((element) => {
      let p = document.createElement("p");
      p.className = "category";
      p.textContent = element.list_name;
      category.appendChild(p);
    });
  } catch {
    console.log("Error");
  }
}

async function fetchDescription() {
  try {
    let res = await fetch("https://books-backend.p.goit.global/books/top-books");
    desarr = await res.json();
    console.log(desarr);
    displayBestSellers(); 
  } catch {
    console.log("Error");
  }
}

function displayBestSellers() {
  des.innerHTML = `<h1>Best Sellers Books</h1><div id="bookCon"></div>`;
  let bookCon = document.getElementById("bookCon");
  desarr.forEach((element) => {
    element.books.forEach((ele) => {
      let div = document.createElement("div");
      div.className = "book";
      div.innerHTML = `<img src="${ele.book_image}">
                       <p class="title">${ele.title}</p>
                       <p class="author">${ele.author}</p>`;
      bookCon.appendChild(div);
    
      div.addEventListener('click', () => showPopup(ele));
    });
  });
}

category.addEventListener("click", function (e) {
  if (e.target.classList.contains('category')) {
    let selectedCategory = e.target.textContent;
    let selectedElement = desarr.find(element => element.list_name === selectedCategory);

    if (selectedElement) {
      des.innerHTML = `<h1>${selectedCategory}</h1><div id="bookCon"></div>`;
      let bookCon = document.getElementById("bookCon");
      selectedElement.books.forEach((ele) => {
        let div = document.createElement("div");
        div.className = "book";
        div.innerHTML = `<img src="${ele.book_image}">
                         <p class="title">${ele.title}</p>
                         <p class="author">${ele.author}</p>`;
        bookCon.appendChild(div);
       
        div.addEventListener('click', () => showPopup(ele));
      });
    }
  }
});

function showPopup(book) {
  popupContent.innerHTML = `<img src="${book.book_image}">
                            <div><h1>${book.title}</h1>
                            <p>${book.description}</p>
                            <p>${book.author}</p>
                            <p>publisher:${book.publisher}</p>
                            <p><a href="${book.amazon_product_url}">AMAZON</a></p>
                            <p>${book.created_date}</p></div>`;
  popup.style.display = "block";
  document.body.classList.add("noscroll");
}

closeBtn.addEventListener('click', () => {
  popup.style.display = "none";
  document.body.classList.remove("noscroll");
});


window.addEventListener('click', (event) => {
  if (event.target == popup) {
    popup.style.display = "none";
    document.body.classList.remove("noscroll");
  }
});


fetchCategoryList();
fetchDescription();
