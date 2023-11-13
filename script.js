let products = [];
let cart = [];
let itemsPerPage = 8;
// let currentPage = 1;
let cards = [];
let storedCart = [];
let priceT = 0;


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




function categories() {
  let catArray = ["All", "Mouse", "Keyboard", "Gaming-Console", "Monitor", "Headset", "Video-Game", "Gaming-PC", "Controller"];

  let container = document.getElementById("categories");
  container.classList = "button d-flex justify-content-around flex-wrap  px-5";
  catArray.forEach(elem => {
    let btn = document.createElement("button");
    btn.type = "button";
    btn.classList = `btn ${elem} btn btn-outline-success`;
    btn.innerHTML = elem;

    btn.addEventListener("click", () => {
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
    } else {
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
    title.classList = "text-center text-white card-title";

    let description = document.createElement("p");
    description.innerHTML = elem.Description;
    description.classList = "text-center text-white card-text";

    let rate = document.createElement('div');
    rate.innerHTML = elem.Rate;
    rate.classList = "d-flex my-2 gap-2 align-self-center stars";

    let price = document.createElement('span');
    price.innerHTML = "$" + elem.Price;
    price.classList = "price text-center color1 fs-4";

    let btns = document.createElement('div');
    btns.classList = "d-flex flex-row justify-content-center gap-4";

    let btnOutline = document.createElement('button');
    btnOutline.type = "button";
    btnOutline.innerHTML = "Customizee";
    btnOutline.classList = "btn btn-cust rounded-5";
    btnOutline.setAttribute("data-toggle", "modal");
    btnOutline.setAttribute("data-target", "#customizationModal");
    btnOutline.addEventListener("click", () => {
      CustomizeFunc(elem.ID);
    });


    let btn = document.createElement('button');
    btn.type = "button";
    btn.innerHTML = "Add To Cart";
    btn.classList = "btn btn-add rounded-5";
    btn.addEventListener("click", () => {
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
/************************************************************************************************* */
/************************************************************************************************* */
/************************************************************************************************* */
/************************************************************************************************* */
/************************************************************************************************* */




function CustomizeFunc(productId) {
  var product = searchById(products, productId);

  var modalTitle = document.querySelector('.modal-title');
  var modalDescription = document.querySelector('.modal-description');
  var modalPrice = document.querySelector('#price');
  var carouselInner = document.querySelector('.product');
var addcart=document.querySelector('#addToCart');
addcart.addEventListener("click", () => {
  addToCart(product);
})




  modalTitle.textContent = product.Name;
  modalDescription.textContent = product.Description;
  modalPrice.textContent = product.Price.toString();

  carouselInner.innerHTML = '';

  product.Images.forEach(function (image, index) {
    var carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    if (index === 0) {
      carouselItem.classList.add('active');
    }

    var img = document.createElement('img');
    img.src = image;
    img.classList.add('d-block', 'w-100');
    img.alt = 'Product Image ' + (index + 1);

    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);
  });


  var minusBtn = document.getElementById('minusBtn');
  var plusBtn = document.getElementById('plusBtn');
  var quantity = 1;
  var quantityElement = document.getElementById('quantity');
  var priceElement = document.getElementById('price');

  function updateQuantityAndPrice(initialPrice) {
    // product.Price = initialPrice * quantity;
    quantityElement.textContent = quantity;
    priceElement.textContent = '$' + (initialPrice * quantity);
  }
  minusBtn.addEventListener('click', function () {
    if (quantity > 1) {
      quantity--;
      updateQuantityAndPrice(product.Price);
    }
  });

  plusBtn.addEventListener('click', function () {
    quantity++;
    updateQuantityAndPrice(product.Price);
  });


  updateQuantityAndPrice(product.Price);

  displayProductFeatures(product);

}


  function updatePrice(product) {
    var selectedOptions = document.querySelectorAll('.features-list select');
    var newPrice = product.Price;
      selectedOptions.forEach(function (select) {
     

        if (select.selectedIndex !== -1) {
        
            var selectedText = select.options[select.selectedIndex].text;
            var selectedValue = parseFloat(selectedText.split(' - ')[1]);
                        console.log(selectedValue);
            if (!isNaN(selectedValue)) {
                newPrice += selectedValue;
            }
        }
    });

    var priceElement = document.getElementById('price');
    if (priceElement) {
        priceElement.textContent = '$' + newPrice.toFixed(2);
    }
  }


  function displayProductFeatures(product) {
    var featuresList = document.querySelector('.features-list');
    featuresList.innerHTML = ''; 

    for (var option in product.Options) {
        var optionList = document.createElement('select');
        optionList.name = option;

        var defaultOption = document.createElement('option');
        defaultOption.text = option;
        optionList.add(defaultOption);

        if (typeof product.Options[option] === 'object') {
            for (var subOption in product.Options[option]) {
                if (typeof product.Options[option][subOption] === 'object') {
                    var optGroup = document.createElement('optgroup');
                    optGroup.label = subOption;

                    for (var subSubOption in product.Options[option][subOption]) {
                        var subOptionElement = document.createElement('option');
                        subOptionElement.text = subSubOption + ' - ' +product.Options[option][subOption][subSubOption];
                        optGroup.appendChild(subOptionElement);
                    }

                    optionList.add(optGroup);
                } else {
                    var subOptionElement = document.createElement('option');
                    subOptionElement.text = subOption + ' - ' + product.Options[option][subOption];
                    optionList.add(subOptionElement);
                }
            }
        }
        optionList.addEventListener('change', function () {
          updatePrice(product);
      });        
      featuresList.appendChild(optionList);
    }
  }


document.getElementById("topCategoryLink").addEventListener("click", () => displayCategoryProducts("Headset"));
document.getElementById("mouseCategoryLink").addEventListener("click", () => displayCategoryProducts("Mouse"));
document.getElementById("laptopPcCategoryLink").addEventListener("click", () => displayCategoryProducts("Monitor"));
document.getElementById("headphoneCategoryLink").addEventListener("click", () => displayCategoryProducts("Keyboard"));

function displayCategoryProducts(category) {
  const catCards = document.getElementById("cat-cards");
  catCards.innerHTML = "";

  const categoryProducts = products.filter(product => product.Category === category);

  for (let i = 0; i < 3 && i < categoryProducts.length; i++) {
    const product = categoryProducts[i];
    const productCard = createProductCard(product);
    catCards.appendChild(productCard);
  }
}

function createProductCard(product) {

  const card = document.createElement("div");
  card.className = "widthc d-flex flex-column justify-content-center bgc mt-4 mb-4 rounded-4 card py-4";

  let img = document.createElement("img");
  img.src = product.Images[0];
  img.alt = product.Name;
  img.classList = "align-self-center w-100 h-50";

  let title = document.createElement("h4");
  title.innerHTML = product.Name;
  title.classList = "text-center text-white card-title";

  let description = document.createElement("p");
  description.innerHTML = product.Description;
  description.classList = "text-center text-white card-text";

  let rate = document.createElement('div');
  rate.innerHTML = product.Rate;
  rate.classList = "d-flex my-2 gap-2 align-self-center stars";

  let price = document.createElement('span');
  price.innerHTML = "$" + product.Price;
  price.classList = "price text-center color1 fs-4";

  let btns = document.createElement('div');
  btns.classList = "d-flex flex-row justify-content-center gap-4";


  let btnOutline = document.createElement('button');
  btnOutline.type = "button";
  btnOutline.innerHTML = "Customizee";
  btnOutline.classList = "btn btn-cust rounded-5";
  btnOutline.setAttribute("data-toggle", "modal");
  btnOutline.setAttribute("data-target", "#customizationModal");
  btnOutline.addEventListener("click", () => {
    CustomizeFunc(product.ID);
  });



  let btn = document.createElement('button');
  btn.type = "button";
  btn.innerHTML = "Add To Cart";
  btn.classList = "btn btn-add rounded-5";
  btn.addEventListener("click", () => {
    addToCart(product);
  })

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(rate);
  card.appendChild(price);
  card.appendChild(btns);


  btns.appendChild(btnOutline);
  btns.appendChild(btn);


  return card;
}




function printPage() {
  window.print();
}

function addToCart(elem) {
  if (cart.includes(elem)) {
    elem.Count++;
  } else {
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
// const foundProduct = searchById(products, "HD001");
// if (foundProduct) {
//   console.log("Product found:", foundProduct);
// } else {
//   console.log("Product with ID", "HD001", "not found.");
// }


function addToCart(element) {

  if (cart.includes(element)) {
    element.Count++;
    localStorage.setItem("cart",JSON.stringify(cart));

  }else{
    element.Count = 1;
    cart.push(element);
    localStorage.setItem("cart",JSON.stringify(cart));
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = '';

  storedCart = JSON.parse(localStorage.getItem("cart"));

  storedCart.forEach((elem, index) => {
    const card = document.createElement("div");
    card.classList = `item d-flex gap-1 my-2 color8 rounded-3 py-3 justify-content-between px-3`;

    const imgDiv = document.createElement('div');
    imgDiv.classList = "w-25 px-2 rounded-3 color7";

    const img = document.createElement("img");
    img.src = elem.Images[0];
    img.alt = elem.Name;
    img.classList = "w-100 h-100 rounded-1";

    const textDiv = document.createElement('div');
    textDiv.classList = "w-75 ms-3";

    const title = document.createElement("h1");
    title.innerHTML = elem.Name;
    title.classList = "fs-5 m-0 text-white";

    const description = document.createElement("p");
    description.innerHTML = elem.Category;
    description.classList = "text-white my-2";

    const miniContainer = document.createElement('div');
    miniContainer.classList = "d-flex justify-content-between hi";

    const counter = document.createElement('div');
    counter.classList = "d-flex gap-2 counter";

    const minus = document.createElement("button");
    minus.innerHTML = "-";
    minus.addEventListener("click", () => {
      removeOneFromCart(index);
    });

    const count = document.createElement('p');
    count.innerHTML = elem.Count;
    count.classList = "text-white";

    const add = document.createElement("button");
    add.innerHTML = "+";
    add.addEventListener("click", () => {
      addCount(index);
    });

    const priceContainer = document.createElement("div");
    priceContainer.classList = "d-flex align-items-baseline fs-5";

    const price = document.createElement('p');
    price.innerHTML = "$" + totalElem(elem);
    price.classList = "text-white me-1";

    const removeButton = document.createElement('button');
    removeButton.classList= "bi bi-trash3 text-danger bg-transparent border border-0 fs-5";
    removeButton.addEventListener("click", () => {
      removeProductFromCart(index);
    });

    card.appendChild(imgDiv);
    card.appendChild(textDiv);
    imgDiv.appendChild(img);
    textDiv.appendChild(title);
    textDiv.appendChild(description);
    textDiv.appendChild(miniContainer);
    miniContainer.appendChild(counter);
    counter.appendChild(minus);
    counter.appendChild(count);
    counter.appendChild(add);
    miniContainer.appendChild(priceContainer);
    priceContainer.appendChild(price);
    priceContainer.appendChild(removeButton);

    cartItemsContainer.appendChild(card);
  });
}

function removeProductFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartDisplay();
}

function addCount(index) {
  cart[index].Count++;
  localStorage.setItem("cart",JSON.stringify(cart));

  updateCartDisplay();
}

function removeOneFromCart(index) {
  cart[index].Count--;
  localStorage.setItem("cart",JSON.stringify(cart));

  if(cart[index].Count == 0){
    removeProductFromCart(index);
    localStorage.setItem("cart",JSON.stringify(cart));
  }else{
    updateCartDisplay();
  }
}

function totalElem(elem) {
  let price = elem.Count * elem.Price;
  let priceFix = price.toFixed(2);
  priceT += priceFix;
  return priceFix;
}

// Call updateCartDisplay initially to display any items that might already be in the cart
updateCartDisplay();

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
 modalContent.innerHTML = "<span class='text'>Prénom :</span> " + firstName + "&nbsp &nbsp &nbsp;<span class='blue-text'>Nom de famille :</span> " + lastName + "<br><span class='text'>Email :</span> " + email + "<br><span class='text'>Téléphone :</span> " + phone + "<br><span class='text'>Message :</span> " + message;
 
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

window.addEventListener("DOMContentLoaded", () => {
  displayData(1);
  displayProducts("Headset");
})

function paginate(page) {
  currentPage = page;
  displayData(page);
}
