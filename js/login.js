const form = document.getElementById("loginform");
const alrt = document.getElementById("alert");
const alertContent = document.getElementById("alert-content");
const users = JSON.parse(localStorage.getItem("users") || null) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user;
  if (users) {
    user = users.find((user) => user.email === form.email.value);
    if (!user) {
      alertContent.innerHTML = "this email is not loging before";
      alrt.classList.remove("d-none");
      return alrt.classList.add("show", "d-block");
    }
  }
  if (user && user.password === form.password.value) {
    alrt.classList.remove("show", "d-block");
    alrt.classList.add("d-none");
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    window.location.replace("index.html");
  } else {
    alertContent.innerHTML = "you entered a wrong password";
    alrt.classList.remove("d-none");
    return alrt.classList.add("show", "d-block");
  }
});
