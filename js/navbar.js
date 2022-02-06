const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const logoutButton = document.getElementById("logout-button");
const cartIcon = document.getElementsByClassName("cartIcon");

const userLogged = JSON.parse(localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", (e) => {
  if (userLogged) {
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
  } else {
    logoutButton.classList.add("d-none");
  }
});

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  loginButton.classList.remove("d-none");
  registerButton.classList.remove("d-none");
  logoutButton.classList.add("d-none");
});

Array.from(cartIcon).forEach((icon) => {
  if (userLogged) {
    icon.href = "cart.html";
  } else {
    icon.href = "login.html";
  }
});
