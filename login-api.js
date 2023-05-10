const form = document.getElementById("login-form");
const message = document.getElementById("message");
let token;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    username: form.username.value,
    password: form.password.value,
  };

  fetch("https://todolist-api.edsonmelo.com.br/api/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      return response.json();
    })
    .then((result) => {
      if (result.message == "Incorrect username and/or password") {
        alert("USUARIO OU SENHA INCORRETOS");
      } else {
        token = result.token;
        location.href = "/toDoList.html";
      }
    })
    .catch((error) => {
      message.textContent = error.message;
    });
});

function getToken() {
  return token;
}
