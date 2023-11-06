let products = [];
function fetchData() {
    // Use the fetch API to get the JSON data from a file (replace 'yourFile.json' with your file's path).
    fetch('./data/products.json').then((response) => {
        return response.json();
      }).then((data) => {
        products.push(...data);
      });
  
    // The fetch operation is asynchronous, so you can't directly return products here.
    // You can either use a callback or a Promise to handle the array once it's populated.
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
  
    // Here, we'll return a Promise that resolves with the products when it's ready.
    return new Promise((resolve) => {
      // Wait for a short time to ensure data is fetched before resolving.
      setTimeout(() => {
        resolve(products);
      }, 1000); // You can adjust the delay as needed.
    });
  }
  
  // Call the function to fetch and store the data, and then print it.
  fetchData().then((result) => {
    console.log('Data fetched and stored:', result);
  });
  
  