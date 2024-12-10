document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const taskList = document.querySelector(".task-list");
    const addTaskBtn = document.querySelector(".add-task-floating-btn");
    const sidebarLinks = document.querySelectorAll("aside nav ul li a");
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks(filter = "Todas as Tarefas") {
      taskList.innerHTML = "";
      const filteredTasks =
        filter === "Todas as Tarefas"
          ? tasks
          : tasks.filter(
              (task) =>
                task.category === filter ||
                (filter === "Prioridade Alta" && task.priority === "alta") ||
                (filter === "Finalizadas" && task.completed)
            );
  
      if (filteredTasks.length === 0) {
        taskList.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
        return;
      }
  
      filteredTasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", task.completed ? "completed" : "incomplete");
        taskDiv.classList.add(`${task.priority}-priority`);
        taskDiv.innerHTML = `
          <div class="task-content-div"">
            <h3>${task.title}</h3>
            <p>Prioridade: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
            <button class="complete-task-btn">${task.completed ? "Desmarcar" : "Marcar como Finalizada"}</button>
          </div>
          <button class="delete-task-btn"><i class="fas fa-trash"></i></button>
        `;
  
        const deleteBtn = taskDiv.querySelector(".delete-task-btn");
        deleteBtn.addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks(filter);
        });
  
        const completeBtn = taskDiv.querySelector(".complete-task-btn");
        completeBtn.addEventListener("click", () => {
          task.completed = !task.completed;
          saveTasks();
          renderTasks(filter);
        });
  
        taskList.appendChild(taskDiv);
      });
    }
  
    function addTask() {
      const taskTitle = prompt("Digite o título da tarefa:");
      if (!taskTitle) return;
  
      const taskPriority = prompt("Digite a prioridade da tarefa (alta, média, baixa):").toLowerCase();
      if (!["alta", "média", "baixa"].includes(taskPriority)) {
        alert("Prioridade inválida! Tarefa não adicionada.");
        return;
      }
  
      const taskCategory = prompt("Digite a categoria da tarefa (Trabalho, Pessoais, etc.):");
      if (!taskCategory) {
        alert("Categoria inválida! Tarefa não adicionada.");
        return;
      }
  
      const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        priority: taskPriority,
        category: taskCategory,
        completed: false,
      };
  
      tasks.push(newTask);
      saveTasks();
      renderTasks();
    }
  
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = link.textContent;
        renderTasks(filter);
      });
    });
  
    addTaskBtn.addEventListener("click", addTask);
  
    renderTasks();

    const menuToggle = document.querySelector(".menu-toggle");
    const drawerContainer = document.querySelector(".drawer-container");
    const menuList = document.querySelector("#menu-list");
  
    menuToggle.addEventListener("click", () => {
      drawerContainer.classList.toggle("open");
      menuList.style.display = 'block'
    });
  
    drawerContainer.addEventListener("click", (event) => {
      if (event.target === drawerContainer) {
        drawerContainer.classList.remove("open");
      }
    });
  });
  
  
  