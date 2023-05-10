
  const form = document.getElementById("cadastro-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
    };

    fetch("https://todolist-api.edsonmelo.com.br/api/user/new/", {
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
        if (result.message == "User Successfully Added" ) {
          alert("Usuário cadastrado com sucesso\n" + "Token: " + result.token);
          location.href = "/login.html";
        }
        alert(result.message);
      })
      .catch((error) => {
        message.textContent = error.message;
      });
  });

