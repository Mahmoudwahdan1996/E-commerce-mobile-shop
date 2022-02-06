const form = document.getElementById("registerForm");
const alrt = document.getElementById("alert");
const alertContent = document.getElementById("alert-content");
const users = JSON.parse(localStorage.getItem("users") || null) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.password.value === form.confirmpassword.value) {
    if (users.find((user) => user.email === form.email.value)) {
      alertContent.innerHTML = "your email is registered before please ...";
      alrt.classList.remove("d-none");
      return alrt.classList.add("show", "d-block");
    }
    const user = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      cart: [],
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user" ,JSON.stringify(user) )
    window.location.replace("index.html");
  } else {
    alertContent.innerHTML = "confirm password shoud match with password";
    alrt.classList.remove("d-none");
    return alrt.classList.add("show", "d-block");
  }
});
