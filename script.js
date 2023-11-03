let products = [];
let cart = [];

function fetchData() {
  fetch('./data/products.json').then((response) => {
      return response.json();
    }).then((data) => {
      products.push(...data);
    });

    products.forEach(elem => {
        let card = document.createElement("div");
        card.className = "card";
    
        let img = document.createElement("img");
        img.src = elem.Images[0];
        img.alt = elem.Name;

        let title = document.createElement("h4");
        title.innerHTML = elem.Name;
        title.className= "card-title";

        let description = document.createElement("p");
        description.innerHTML = elem.Description;
        description.className = "card-text";
    
    });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
      console.log(products);
    }, 1000);
  });
}

fetchData().then((result) => {
  console.log('Data fetched and stored:', result);
});
function printPage() {
    window.print();
}

function addToCart(elem) {
    if (cart.includes(elem)) {
        elem.count ++;
    }else{
        cart.push(elem);
    }
}
//function filter by Category :
function filterByCategory(elm) {
  if (elm === 'All') {
    displayProducts(products);
  } else {
    //creer tableau avec le nom "filteredProducts" 
    const filteredProducts = products.filter((product) => product.category === elm);
    displayProducts(filteredProducts);
  }
}
//
const categoryfilter = document.getElementById('categoryfilter');
categoryfilter.addEventListener('change', () => {
    const selectedCategory = categoryfilter.value;
    filterByCategory(selectedCategory);
});

function removeProductFromCart(productId) {
  const productIndex = cart.findIndex((product) => product.ID === productId);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    console.log(`Produit avec l'ID ${productId} supprimé du panier.`);
  } else {
    console.log(`Produit avec l'ID ${productId} non trouvé dans le panier.`);
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
const foundProduct = searchById(products, productToSearchID);
if (foundProduct) {
  console.log("Product found:", foundProduct);
} else {
  console.log("Product with ID", productToSearchID, "not found.");
}




