let products = [];
let cart = [];
let itemsPerPage = 8;
let currentPage = 1;
let cards = [];


function fetchData() {
  fetch('./data/products.json').then((response) => {
      return response.json();
    }).then((data) => {
      products.push(...data);
    });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
      console.log(products);

    }, 1000);
  });
}


fetchData().then((result) => {
  createElements(result);  
});

function categories(){
  let catArray = ["All","Mouse","Keyboard","Gaming-Console","Monitor","Headset","Video-Game","Gaming-PC","Controller"];

  let container = document.getElementById("cat-cards");
  catArray.forEach(elem => {
    let btn = document.createElement("button");
    btn.type="button";
    btn.classList = `btn btn-success ${elem}`;
    btn.innerHTML = elem;

    btn.addEventListener("click",()=>{
      filterByCategory(elem);
    })

    container.appendChild(btn);
  });
}

function displayData() {
  let array = document.querySelectorAll(".card");
  for (var i = 0; i < array.length; i++) {
    if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
      array[i].classList.remove('d-none'); 

    }
  }
  cards = [...array];

}

function createElements() {
  let Cards = document.createElement('div');
  Cards.id = "cat-cards";
  document.body.appendChild(Cards);

  categories();

  products.forEach(elem => {
    let card = document.createElement("div");
    card.className = `card ${elem.Category}  d-none`;

    let img = document.createElement("img");
    img.src = elem.Images[0];
    img.alt = elem.Name;

    let title = document.createElement("h4");
    title.innerHTML = elem.Name;
    title.classList= "card-title";

    let description = document.createElement("p");
    description.innerHTML = elem.Description;
    description.classList = "card-text";

    let rate = document.createElement('div');
    rate.innerHTML = elem.Rate;
    rate.classList = "icons";

    let price = document.createElement('span');
    price.innerHTML = "$"+elem.Price;
    price.classList = "price";

    let btns = document.createElement('div');
    btns.classList = "price";

    let btnOutline = document.createElement('button');
    btnOutline.type = "button";
    btnOutline.innerHTML = "Personalize";
    btnOutline.classList = "btn btn-outline-success";

    let btn = document.createElement('button');
    btn.type = "button";
    btn.innerHTML = "Add To Cart";
    btn.classList = "btn btn-success";
    btn.addEventListener("click",()=>{
      addToCart(elem);
    })

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(rate);
    card.appendChild(price);
    card.appendChild(btns);


    btns.appendChild(btnOutline);
    btns.appendChild(btn);

    Cards.appendChild(card);
});

}

function printPage() {
  document.getElementById("print-btns").style.display = "none";
  window.print();
  document.getElementById("print-btns").style.display = "flex";

}

function addToCart(elem) {
    if (cart.includes(elem)) {
        elem.Count ++;
    }else{
        cart.push(elem);
    }
    console.log(cart);
}

function filterByCategory(elm) {
  if (elm === 'All') {
    displayData()
  } else {
    cards.forEach(card => {
      if (card.classList.contains(elm)) {
        card.classList.remove('d-none');
      } else {
        card.classList.add('d-none');
      }
    });  
  }
}

function searchById(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].ID === id) {
      return array[i];
    }
  }
  return null; 
}
//test
const foundProduct = searchById(products, "HD001");
if (foundProduct) {
  console.log("Product found:", foundProduct);
} else {
  console.log("Product with ID", "HD001", "not found.");
}

function removeProductFromCart(productId) {
  const productIndex = cart.findIndex((product) => product.ID === productId);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    console.log(`Produit avec l'ID ${productId} supprimé du panier.`);
  } else {
    console.log(`Produit avec l'ID ${productId} non trouvé dans le panier.`);
  }
}


function addToCart() {
  cart.forEach(elem => {
    let card = document.createElement("div");
    card.className = `card`;

    let img = document.createElement("img");
    img.src = elem.Images[0];
    img.alt = elem.Name;

    let title = document.createElement("h4");
    title.innerHTML = elem.Name;
    title.classList= "card-title";

    let description = document.createElement("p");
    description.innerHTML = elem.Description;
    description.classList = "card-text";

    let rate = document.createElement('div');
    rate.innerHTML = elem.Rate;
    rate.classList = "icons";

    let price = document.createElement('span');
    price.innerHTML = "$"+elem.Price;
    price.classList = "price";

    let btns = document.createElement('div');
    btns.classList = "price";

    let btnOutline = document.createElement('button');
    btnOutline.type = "button";
    btnOutline.innerHTML = "Personalize";
    btnOutline.classList = "btn btn-outline-success";

    let btn = document.createElement('button');
    btn.type = "button";
    btn.innerHTML = "Add To Cart";
    btn.classList = "btn btn-success";
    btn.addEventListener("click",()=>{
      addToCart(elem);
    })

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(rate);
    card.appendChild(price);
    card.appendChild(btns);


    btns.appendChild(btnOutline);
    btns.appendChild(btn);

    Cards.appendChild(card);
});
}




window.addEventListener("l",()=>{
  displayData();
})
