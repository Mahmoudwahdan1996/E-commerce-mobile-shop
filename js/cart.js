const cartContainer = document.getElementById("t-body");
const user = JSON.parse(localStorage.getItem("user") || null);
const totalCount = document.getElementById("totalCount");
const totalPrice = document.getElementById("totalPrice");

const getCountAndTotal = (user) => {
  const products = user.cart;

  let total = 0;
  let count = 0;
  for (let i = 0; i < user.cart.length; i++) {
    total += products[i].price * products[i].quantity;
    count += products[i].quantity;
  }

  totalPrice.innerHTML = " " + total + "$";
  totalCount.innerHTML = " " + count;
};
const fetchData = () => {
  let userCart = user.cart;

  let container = "";
  if (user.cart.length > 0) {
    userCart.forEach((product, index) => {
      container +=
        ` 
      <div class="row my-5  pb-2 border-bottom" >
      <div class="col-5 col-md-3 d-flex flex-column align-items-center justify-content-center">
      <img src='${product.image}'alt='${product.title}'  class="w-50  "/>
      <p class="d-md-none text-center">${product.title}</p>
             </div>
            <div class="col-3 d-none d-md-flex align-items-center justify-content-center " >
                <h3 class="text-center">${product.title}</h3>
                </div>
            <div class="col-3 col-md-3 d-flex align-items-center justify-content-center ">
            <div class="d-flex flex-column align-items-center justify-content-center">
                    <i class="bi bi-caret-up-fill increase-icon" 
                        onclick='icreaseCount(` +
        product.id +
        "," +
        index +
        `)' ></i>
                    <span class="mx-3 fs-4 fw-bold prod-quantity">${product.quantity}</span>
                    <i 
                        class="bi bi-caret-down-fill decrease-icon" 
                        onclick='decreaseCount(` +
        index +
        `)'>
                    </i>
                </div>
            </div>
            <div class="col-3 col-md-2 d-flex align-items-center justify-content-center  ">
                <h3 class="text-center">${product.price}</h3>
            </div>
            <div class="col-1 col-md-1 d-flex align-items-center justify-content-center ">
            <i  
                    class=" bi bi-trash-fill fs-5" 
                    onclick='deleteProduct(` +
        index +
        `)'>
      </i>
      </div>
      
      </div>
            
      `;
    });

    cartContainer.innerHTML = container;
    getCountAndTotal(user);

  } else {
    container = `<h3 class="text-center py-5 " >your Cart is Empty </h3>`;
    cartContainer.innerHTML = container;
    getCountAndTotal(user);
  }
};

const deleteProduct = (index) => {
  user.cart.splice(index, 1);
  localStorage.setItem("user", JSON.stringify(user));
  fetchData();
};

const productQuantity = document.getElementsByClassName("prod-quantity");

const decreaseCount = (index) => {
  if (user) {
    if (+productQuantity[index].innerHTML === 1) {
      user.cart.splice(index, 1);
      localStorage.setItem("user", JSON.stringify(user));
      fetchData();
    } else {
      productQuantity[index].innerHTML = +productQuantity[index].innerHTML - 1;
      user.cart[index].quantity = +productQuantity[index].innerHTML;
      getCountAndTotal(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
};

const icreaseCount = (id, index) => {
  if (user) {
    const product = user.cart.find((prodct) => prodct.id === id);
    if (+productQuantity[index].innerHTML >= product.stock) {
      productQuantity[index].innerHTML = product.stock;
      user.cart[index].quantity = product.stock;
      getCountAndTotal(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      productQuantity[index].innerHTML = +productQuantity[index].innerHTML + 1;
      user.cart[index].quantity = +productQuantity[index].innerHTML;
      getCountAndTotal(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
};
let increaseQuantity = document.getElementsByClassName("increase-icon");

document.addEventListener("DOMContentLoaded", fetchData);
