const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}


function renderTasks(){

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if(currentFilter === "active"){

    filteredTasks = tasks.filter(
      task => !task.completed
    );

  }

  if(currentFilter === "completed"){

    filteredTasks = tasks.filter(
      task => task.completed
    );

  }

  filteredTasks.forEach((task,index)=>{

    const li = document.createElement("li");

    li.innerHTML = `

      <div>

        <input
        type="checkbox"
        class="check"
        ${task.completed ? "checked" : ""}
        >

        <span class="task-text ${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

      </div>

      <div class="actions">

        <button class="edit">
          Edit
        </button>

        <button class="delete">
          Delete
        </button>

      </div>

    `;

    const checkbox = li.querySelector(".check");

    checkbox.addEventListener("change",()=>{

      task.completed = !task.completed;

      saveTasks();

      renderTasks();

    });

    const editBtn = li.querySelector(".edit");

    editBtn.addEventListener("click",()=>{

      let updated = prompt(
        "Edit task",
        task.text
      );

      if(updated){

        task.text = updated;

        saveTasks();

        renderTasks();

      }

    });

    const deleteBtn = li.querySelector(".delete");

    deleteBtn.addEventListener("click",()=>{

      tasks = tasks.filter(
        item => item !== task
      );

      saveTasks();

      renderTasks();

    });

    taskList.appendChild(li);

  });

}


addBtn.addEventListener("click",()=>{

  const value = taskInput.value.trim();

  if(value === ""){

    alert("Enter a task");

    return;
  }

  tasks.push({

    text:value,

    completed:false

  });

  saveTasks();

  renderTasks();

  taskInput.value = "";

});


filterBtns.forEach(btn=>{

  btn.addEventListener("click",()=>{

    document
    .querySelector(".active")
    .classList.remove("active");

    btn.classList.add("active");

    currentFilter = btn.dataset.filter;

    renderTasks();

  });

});


renderTasks();