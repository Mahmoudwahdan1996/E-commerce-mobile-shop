let filtering = "all";
let categotriesButton = document.getElementsByClassName("category");
categotriesButton = Array.from(categotriesButton);

const fetchData = async () => {
  try {
    const res = await fetch(
      "https://mahmoudwahdan1996.github.io/E-commerce-mobile-shop-json-data/data/products.json"
    );
    data = await res.json();
    if (filtering === "all") {
      displayData(data.products);
    } else {
      const products = data.products.filter(
        (product) => product.category === filtering
      );
      displayData(products);
    }
  } catch (e) {
    console.log("something went wrong!", e);
  }
};

const productsContainer = document.getElementById("products-page");
const displayData = (products) => {
  let container = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    container += `
        <div class="col-sm-6 col-md-4 col-lg-3 my-2 " >
            <div class="border">
                <div class="product-image d-flex align-items-center justify-content-center my-3">
                    <a href="product.html?id=${product.id}" class="d-block text-center" >
                        <img src=${product.image} alt=${product.title} class="card-img-top w-50 " />
                    <a/>
                </div>
                <div class="card-body ">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text lead">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <hr/>
                    <div class="d-flex align-items-center justify-content-between  " >
                        <p class="fs-4 ">${product.price} $ <p>
                        <a href="#" class="addProductsToCart" data-id="${product.id}"  >
                            <i class="bi bi-cart-check-fill d-block fw-bold fs-2 text-dark" 
                            ></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      `;
  }
  productsContainer.innerHTML = container;
  const addProductsToCart =
    document.getElementsByClassName("addProductsToCart");
  Array.from(addProductsToCart).forEach((addProductIcon) => {
    addProductIcon.addEventListener("click", (e) => {
      e.preventDefault();
      let id = addProductIcon.dataset.id;
      addTocart(id, products);
    });
  });
};

const alertProductName = document.getElementById("alertProductName");
const alertProduct = document.getElementById("alertProduct");
const alertProductcontent = document.getElementById("alertProductcontent");

const addTocart = (id, products) => {
  const user = JSON.parse(localStorage.getItem("user") || null);
  const product = products[id];

  if (user) {
    const userHasProduct = user.cart.findIndex(
      (prod) => prod.id === product.id
    );

    if (userHasProduct != -1) {
      if (
        user.cart[userHasProduct].quantity >= user.cart[userHasProduct].stock
      ) {
        user.cart[userHasProduct].quantity = user.cart[userHasProduct].stock;
        alertProductName.innerHTML = product.title;
        alertProductcontent.innerHTML = "you cant add more ";
        alertProduct.style.display = "flex";
        window.setTimeout(() => {
          alertProduct.style.display = "none";
        }, 3000);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        user.cart[userHasProduct].quantity += 1;
        alertProductName.innerHTML = product.title;
        alertProductcontent.innerHTML = "added to cart";
        alertProduct.style.display = "flex";
        window.setTimeout(() => {
          alertProduct.style.display = "none";
        }, 3000);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } else {
      product.quantity = 1;
      console.log(product.quantity);
      user.cart.push(product);
      alertProductName.innerHTML = product.title;
      alertProductcontent.innerHTML = "added to cart";
      alertProduct.style.display = "flex";
      window.setTimeout(() => {
        alertProduct.style.display = "none";
      }, 3000);
      localStorage.setItem("user", JSON.stringify(user));
    }
  } else {
    location.replace("login.html");
  }
};

categotriesButton.forEach((categButt, index) => {
  categButt.addEventListener("click", (e) => {
    e.preventDefault();
    for (var i = 0; i < categotriesButton.length; i++) {
      categotriesButton[i].classList.remove("active", "disabled");
    }
    categotriesButton[index].classList.add("active", "disabled");
    filtering = categotriesButton[index].dataset.id;
    fetchData();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  alertProduct.style.display = "none";
});
