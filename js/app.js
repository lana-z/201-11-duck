
const productsContainer = document.getElementById("products");
const resultsContainer = document.getElementById("results");

const image1 = document.querySelector('#products img:first-child');
const image2 = document.querySelector('#products img:nth-child(2)');
const image3 = document.querySelector('#products img:nth-child(3)');

const button = document.getElementById("showResults");

let state = {
    numClicksSoFar: 0,
    numClicksAllowed: 25,
    allProducts: [],
};

function Product( name, image) {
    this.name = name;
    this.imageFile = image;
    this.votes = 0;
    this.views = 0;
    state.allProducts.push(this);
}

function renderProducts () {
    
    let product1, product2, product3;

    function pickRandomProd() {
        
        let newThree;
        do {
            newThree =  Math.floor(Math.random() * state.allProducts.length );
        } while (newThree === product1 || newThree === product2 || newThree === product3);
        return newThree;
    }
    
    product1 = pickRandomProd();
    product2 = pickRandomProd();
    product3 = pickRandomProd();



    image1.src = state.allProducts[product1].imageFile;
    image1.alt = state.allProducts[product1].name;

    image2.src = state.allProducts[product2].imageFile;
    image2.alt = state.allProducts[product2].name;

    image3.src = state.allProducts[product3].imageFile;
    image3.alt = state.allProducts[product3].name;

    state.allProducts[product1].views++;
    state.allProducts[product2].views++;
    state.allProducts[product3].views++;
}

// button.style.display = "none";

// function handleClick(event) {
//     let prodName = event.target.alt;

//     for (let i = 0; i < state.allProducts.length; i++) {
//         if (prodName === state.allProducts[i].name){
//             state.allProducts[i].votes++;
//             break;
//         }
//     }

//     state.numClicksSoFar++;

//     if(state.numClicksSoFar === state.numClicksAllowed) {
//         removeEventListener();
//         button.style.display = "block";
//     } else {
//         renderProducts();
//     }
// }

function renderResults() {
    const resultsList = document.createElement("ul");
    for (const product of state.allProducts) {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.name}: Votes - ${product.votes}, Views - ${product.views}`;
      resultsList.appendChild(listItem);
    }
    
    resultsContainer.appendChild(resultsList);
  
    button.style.display = "none";

    let prodName = []
    let productSelection = []
    let productViews = []

    for (let i = 0; i < state.allProducts.length; i++ ){
        prodName.push( state.allProducts[i].name );
        productSelection.push( state.allProducts[i].votes );
        productViews.push(state.allProducts[i].views)
    }

    const data = {
        labels: prodName, 
        datasets: [
            {
                label: "Selected",
                data: productSelection,
                borderWidth: 1,
                backgroundColor: [
                    'red']
            },
            {
                label: "Viewed",
                data: productViews,
                borderWidth: 1,
                backgroundColor: ['brown']
            }
        ]
    }

    const config = {
        type: 'bar',
        data: data, 
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }

    const myChart = new Chart(resultsContainer, config);
}


function handleClick(event) {
    let prodName = event.target.alt;

    for (let i = 0; i < state.allProducts.length; i++) {
        if (prodName === state.allProducts[i].name){
            state.allProducts[i].votes++;
            break;
        }
    }

    state.numClicksSoFar++;

    if(state.numClicksSoFar >= state.numClicksAllowed) {
        removeEventListener();
     } else {
        renderProducts();
    }   
}

function setupListeners() {
 productsContainer.addEventListener("click", handleClick);
 button.addEventListener("click", renderResults)   
}

function removeEventListener() {
    productsContainer.removeEventListener("click", handleClick);
}

new Product("Travel Bag", "product-images/bag.jpg");
new Product("Banana Slicer", "product-images/banana.jpg");
new Product("Grossly Teched", "product-images/bathroom.jpg")
new Product("Boots", "product-images/boots.jpg");
new Product("Breakfast Machine", "product-images/breakfast.jpg");
new Product("Meatball Gum", "product-images/bubblegum.jpg");
new Product("Chair", "product-images/chair.jpg");
new Product("Toy", "product-images/cthulhu.jpg");
new Product("Dog Duck", "product-images/dog-duck.jpg");
new Product("Dragon Meat", "product-images/dragon.jpg");
new Product("Spoon Pen", "product-images/pen.jpg" );
new Product("Dog Booties", "product-images/pet-sweep.jpg");
new Product("Pizza Scissors", "product-images/scissors.jpg");
new Product("Shark", "product-images/shark.jpg");
new Product("Baby Mop", "product-images/sweep.png");
new Product("Sleeping Bag", "product-images/tauntaun.jpg");
new Product("Unicorn Meat", "product-images/unicorn.jpg");
new Product("Water Can Game", "product-images/water-can.jpg");
new Product("Wine Glass Drinking Game", "product-images/wine-glass.jpg" );


renderProducts();
setupListeners();