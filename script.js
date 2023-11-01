let products =[];
let cart = [];

async function fetchData() {
    let dataFetched = await fetch("./data/products.json");
    let data = await dataFetched.text();
    products = JSON.parse(data);
    console.log(products);
}

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

fetchData();