import { getToken } from './login-api.js';

const taskList = document.getElementById("tasks-table").getElementsByTagName('tbody')[0];

function addTaskToTable(task) {
  const row = taskList.insertRow();
  row.innerHTML = `
    <td>${task.id}</td>
    <td>${task.name}</td>
    <td>${task.created_at}</td>
    <td>${task.done ? 'Sim' : 'Não'}</td>
    <td>
      <button class="btn-done" data-id="${task.id}">Marcar como Concluída</button>
      <button class="btn-delete" data-id="${task.id}">Excluir</button>
    </td>
  `;
}

function loadTasks() {
  const token = getToken();

  fetch("https://todolist-api.edsonmelo.com.br/api/task/list/", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar tarefas");
      }
      return response.json();
    })
    .then((result) => {
      result.tasks.forEach(addTaskToTable);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

window.addEventListener("load", loadTasks);
