const TaskManager = {
    inputBox: document.getElementById("input-box"),
    listContainer: document.getElementById("list-container"),
    completedCounter: document.getElementById("completed-counter"),
    uncompletedCounter: document.getElementById("uncompleted-counter"),
  
    init() {
      document.getElementById("add-btn").addEventListener("click", () => this.addTask());
      this.listContainer.addEventListener("click", (event) => this.handleTaskActions(event));
      this.updateCounters();
    },
  
    addTask() {
      const taskText = this.inputBox.value.trim();
      if (!taskText) {
        alert("Please write down a task");
        return;
      }
  
      const task = this.createTaskElement(taskText);
      this.listContainer.appendChild(task);
      this.inputBox.value = "";
      this.updateCounters();
    },
  
    createTaskElement(taskText) {
      const li = document.createElement("li");
  
      li.innerHTML = `
        <label>
          <input type="checkbox">
          <span class="task-text">${taskText}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
      `;
  
      return li;
    },
  
    updateCounters() {
      const completedTasks = this.listContainer.querySelectorAll("li.completed").length;
      const totalTasks = this.listContainer.querySelectorAll("li").length;
  
      this.completedCounter.textContent = completedTasks;
      this.uncompletedCounter.textContent = totalTasks - completedTasks;
    },
  
    handleTaskActions(event) {
      const li = event.target.closest("li");
      if (!li) return;
  
      if (event.target.matches("input[type='checkbox']")) {
        li.classList.toggle("completed", event.target.checked);
        this.updateCounters();
      }
  
      if (event.target.matches(".edit-btn")) {
        this.editTask(li);
      }
  
      if (event.target.matches(".delete-btn")) {
        this.deleteTask(li);
      }
    },
  
    editTask(li) {
      const taskSpan = li.querySelector(".task-text");
      const updatedText = prompt("Edit task:", taskSpan.textContent);
      if (updatedText !== null && updatedText.trim() !== "") {
        taskSpan.textContent = updatedText;
        li.classList.remove("completed");
        li.querySelector("input[type='checkbox']").checked = false;
        this.updateCounters();
      }
    },
  
    deleteTask(li) {
      if (confirm("Are you sure you want to delete this task?")) {
        li.remove();
        this.updateCounters();
      }
    },
  };
  
  // Initialize event listeners and set up the task manager
  document.addEventListener("DOMContentLoaded", () => TaskManager.init());
  