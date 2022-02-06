const cartButton = document.getElementById("add-to-product");
const icreaseButton = document.getElementById("increase-icon");
const decreaseButton = document.getElementById("decrease-icon");
const productQuantity = document.getElementById("prod-quantity");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch("https://mahmoudwahdan1996.github.io/E-commerce-mobile-shop-json-data/data/products.json");
    data = await res.json();
    const prodId = +location.search.replace(/\D/gi, "");
    const product = data.products[prodId];

    displayData(prodId, data.products);
    cartButton.addEventListener("click", (e) => {
      addToCart(product);
    });
    icreaseButton.addEventListener("click", (e) => {
      icreaseCount(product);
    });
    decreaseButton.addEventListener("click", (e) => {
      decreaseCount();
    });
  } catch (e) {
    console.log("something went wrong!", e);
  }
};

const displayData = (id, products) => {
  let product = products.find((product) => {
    return product.id === id;
  });
  product.quantity = 1;

  document.getElementById("prod-image").src = product.image;
  document.getElementById("prod-image").style.width = "90%";
  document.getElementById("prod-title").innerHTML = product.title;
  document.getElementById("product-title").innerHTML = product.title;
  document.getElementById("prod-price").innerHTML = product.price + " " + "$";
  productQuantity.innerHTML = product.quantity;
};

const addToCart = (product) => {
  const user = JSON.parse(localStorage.getItem("user") || null);
  if (user) {
    const productisFound = user.cart.find((p) => p.id === product.id);
    let countProduct = +productQuantity.innerHTML;
    if (productisFound) {
      productisFound.quantity = productisFound.quantity + countProduct;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      product.quantity = +countProduct;
      user.cart.push(product);
      localStorage.setItem("user", JSON.stringify(user));
    }
  } else {
    location.replace("login.html");
  }
};

const icreaseCount = (product) => {
  if (+productQuantity.innerHTML >= product.stock) {
    productQuantity.innerHTML = product.stock;
  } else {
    productQuantity.innerHTML = +productQuantity.innerHTML + 1;
  }
};

const decreaseCount = () => {
  if (+productQuantity.innerHTML <= 0) {
    productQuantity.innerHTML = 0;
  } else {
    productQuantity.innerHTML = +productQuantity.innerHTML - 1;
  }
};

// const tempStars = (stars) => {
//   return Array.from({ length: 5 }, (_, index) => {
//     const number = index + 0.5;
//     return stars >= index + 1 ? `<i class='bi bi-star-fill'></i>`: stars >= number ? `<i class='bi bi-star-half'></i>`: `<i class='bi bi-star'></i> `;
//   });
// };
