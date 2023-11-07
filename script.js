let products = [];
let cart = [];
let itemsPerPage = 8;
// let currentPage = 1;
let cards = [];

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function fetchData() {
  fetch('../data/products.json').then((response) => {
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

  let container = document.getElementById("categories");
  container.classList = "button d-flex justify-content-around flex-wrap  px-5";
  catArray.forEach(elem => {
    let btn = document.createElement("button");
    btn.type="button";
    btn.classList = `btn ${elem} btn btn-outline-success`;
    btn.innerHTML = elem;

    btn.addEventListener("click",()=>{
      filterByCategory(elem);
    })

    container.appendChild(btn);
  });
}

function displayData(currentPage) {
  let array = document.querySelectorAll(".card");
  for (var i = 0; i < array.length; i++) {
    if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
      array[i].classList.remove('d-none'); 
    }else{
      array[i].classList.add('d-none'); 

    }
  }
  cards = [...array];

}

function createElements() {
  let Cards = document.getElementById("cat-cards");

  categories();

  products.forEach(elem => {
    let card = document.createElement("div");
    card.className = `card ${elem.Category} widthc flex-column justify-content-center bgc mt-5 mb-4 p-3 rounded-4 card d-none`;

    let img = document.createElement("img");
    img.src = elem.Images[0];
    img.alt = elem.Name;
    img.classList = "align-self-center w-100 h-50";

    let title = document.createElement("h4");
    title.innerHTML = elem.Name;
    title.classList= "text-center text-white card-title";

    let description = document.createElement("p");
    description.innerHTML = elem.Description;
    description.classList = "text-center text-white card-text";

    let rate = document.createElement('div');
    rate.innerHTML = elem.Rate;
    rate.classList = "d-flex my-2 gap-2 align-self-center stars";

    let price = document.createElement('span');
    price.innerHTML = "$"+elem.Price;
    price.classList = "price text-center color1 fs-4";

    let btns = document.createElement('div');
    btns.classList = "d-flex flex-row justify-content-center gap-4";

    let btnOutline = document.createElement('button');
    btnOutline.type = "button";
    btnOutline.innerHTML = "Personalize";
    btnOutline.classList = "btn btn-cust rounded-5";

    let btn = document.createElement('button');
    btn.type = "button";
    btn.innerHTML = "Add To Cart";
    btn.classList = "btn btn-add rounded-5";
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

    console.log("hhhh");
});

}

function printPage() {
  window.print();
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
    displayData(1);
    document.getElementById("paginate").classList.add("d-flex"); 
    document.getElementById("paginate").classList.remove("d-none"); 

  } else {
    document.getElementById("paginate").classList.add("d-none"); 
    document.getElementById("paginate").classList.remove("d-flex"); 
    cards.forEach(card => {
      if (card.classList.contains(elm)) {
        card.classList.remove('d-none');
        card.classList.add('d-flex');
      } else {
        card.classList.remove('d-flex');

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


function addToCart(elem) {
  let Items = document.getElementById("cart-items")
    let card = document.createElement("div");
    card.classList = `card`;

    let img = document.createElement("img");
    img.src = elem.Images[0];
    img.alt = elem.Name;

    let title = document.createElement("h4");
    title.innerHTML = elem.Name;
    title.classList= "card-title";

    let description = document.createElement("p");
    description.innerHTML = elem.Description;
    description.classList = "card-text";

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
    card.appendChild(price);
    card.appendChild(btns);


    btns.appendChild(btnOutline);
    btns.appendChild(btn);

    Items.appendChild(card);
}
// Fonction pour calculer le total du panier :
function calculateTotal() {
  let total = 0;
  for (const elem of cart) {
      total += elem.Price * elem.quantity;
  }
  return total;
}
//fonction pour :

//Formulaire :
function resetForm() {
  var form = document.getElementById("contactForm");
  form.reset();

  // Réinitialisez les messages d'erreur en appelant resetErrorFeedback pour chaque champ
  var firstName = document.getElementById("FN");
  var lastName = document.getElementById("lname");
  var email = document.getElementById("email");
  var phone = document.getElementById("pnum");
  var message = document.getElementById("message");

  resetErrorFeedback(firstName);
  resetErrorFeedback(lastName);
  resetErrorFeedback(email);
  resetErrorFeedback(phone);
  resetErrorFeedback(message);
}

function showErrorFeedback(inputElement, message) {
  inputElement.classList.add('is-invalid');
  var invalidFeedback = inputElement.nextElementSibling;
  invalidFeedback.textContent = message;
}

function resetErrorFeedback(inputElement) {
  inputElement.classList.remove('is-invalid');
  var invalidFeedback = inputElement.nextElementSibling;
  invalidFeedback.textContent = '';
}

function validateForm(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire
  var firstName = document.getElementById("FN").value;
  var lastName = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("pnum").value;
  var message = document.getElementById("message").value;
  // Expressions régulières pour valider les champs
  var namePattern = /^[A-Za-z\s]{3,50}$/;
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var phonePattern = /^\+212\d{9}$|^\d{10}$/;
  var messagePattern = /^.{1,1000}$/;
  // Array pour stocker les erreurs
  var errors = [];
  if (!namePattern.test(firstName)) {
      showErrorFeedback(document.getElementById("FN"), "First name is invalid.");
      errors.push("First name is invalid.");
  } else {
      resetErrorFeedback(document.getElementById("FN"));
  }
  if (!namePattern.test(lastName)) {
      showErrorFeedback(document.getElementById("lname"), "Last name is invalid.");
      errors.push("Last name is invalid..");
  } else {
      resetErrorFeedback(document.getElementById("lname"));
  }
  if (!emailPattern.test(email)) {
      showErrorFeedback(document.getElementById("email"), "Please enter a valid email address.");
      errors.push("Please enter a valid email address.");
  } else {
      resetErrorFeedback(document.getElementById("email"));
  }

  if (!phonePattern.test(phone)) {
      showErrorFeedback(document.getElementById("pnum"), "Please enter a valid phone number (+212 followed by 9 digits).");
      errors.push("Please enter a valid phone number (+212 followed by 9 digits).");
  } else {
      resetErrorFeedback(document.getElementById("pnum"));
  }

  if (!messagePattern.test(message)) {
      showErrorFeedback(document.getElementById("message"), "The message must be between 1 and 1000 characters.");
      errors.push("The message must be between 1 and 1000 characters.");
  } else {
      resetErrorFeedback(document.getElementById("message"));
  }

  if (errors.length > 0) {
      return false; // Le formulaire n'est pas valide
  }

 // Le formulaire est valide,  la popup 
 var modalContent = document.getElementById("modal-content");
 modalContent.innerHTML = "<span class='text'>Prénom :</span> " + firstName + "&nbsp;<span class='blue-text'>Nom de famille :</span> " + lastName + "<br><span class='text'>Email :</span> " + email + "<br><span class='text'>Téléphone :</span> " + phone + "<br><span class='text'>Message :</span> " + message;
 
  // Afficher la popup
  var myModal = new bootstrap.Modal(document.getElementById('successModal'));
  myModal.show();
  return false;
}

function closeCart() {
  document.getElementById("cart").style.display = "none";
}
function openCart() {
  document.getElementById("cart").style.display = "flex";
  if (document.getElementById("mySidenav").style.width = "250px") {
    closeNav();
  }
}

function calculateTotal() {
  let total = 0;
  for (const elem of cart) {
      total += elem.Price * elem.quantity;
  }
  return total;
}

window.addEventListener("load",()=>{
  displayData(1);
})

function paginate(page) {
  currentPage = page;
  displayData(page);
}