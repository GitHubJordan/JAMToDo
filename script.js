document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const filterTasks = document.getElementById('filterTasks');
    const toggleDarkMode = document.getElementById('toggleDarkMode');
  
    let tasks = [];
    
    addTaskBtn.addEventListener('click', addTask);
    filterTasks.addEventListener('change', filterTaskList);
    toggleDarkMode.addEventListener('click', toggleDarkTheme);
  
    function addTask() {
      const taskValue = taskInput.value.trim();
      if (taskValue === "") return;
  
      const task = { text: taskValue, completed: false };
      tasks.push(task);
      taskInput.value = '';
  
      renderTasks();
      updateTaskCount();
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'add-animation');
  
        if (task.completed) {
          li.classList.add('completed');
        }
  
        li.innerHTML = `
          <span class="task-text ${task.completed ? 'text-decoration-line-through' : ''}">${task.text}</span>
          <div>
            <button class="complete-task btn btn-sm btn-success"><i class="bi bi-check-lg"></i></button>
            <button class="edit-task btn btn-sm btn-warning"><i class="bi bi-pencil-square"></i></button>
            <button class="delete-task btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
          </div>
        `;
  
        const deleteBtn = li.querySelector('.delete-task');
        const editBtn = li.querySelector('.edit-task');
        const completeBtn = li.querySelector('.complete-task');
  
        deleteBtn.addEventListener('click', function () {
          li.classList.add('remove-animation');
          setTimeout(() => {
            tasks.splice(index, 1);
            renderTasks();
            updateTaskCount();
          }, 300);
        });
  
        editBtn.addEventListener('click', function () {
          const newTaskValue = prompt("Editar tarefa", task.text);
          if (newTaskValue) {
            task.text = newTaskValue;
            renderTasks();
          }
        });
  
        completeBtn.addEventListener('click', function () {
          tasks[index].completed = !tasks[index].completed;
          renderTasks();
          updateTaskCount();
        });
        
        filterTasks.value = 'all';
        
        taskList.appendChild(li);
      });
    }
  
    function updateTaskCount() {
      const pendingTasks = tasks.filter(task => !task.completed);
      taskCount.textContent = pendingTasks.length;
    }
  
    function filterTaskList() {
      const filter = filterTasks.value;
      const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
      });
      renderFilteredTasks(filteredTasks);
    }
  
    function renderFilteredTasks(filteredTasks) {
      taskList.innerHTML = '';
      filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'task-adding'); // Adiciona a animação de exibição
  
        li.innerHTML = `
          <span class="task-text ${task.completed ? 'text-decoration-line-through' : ''}">${task.text}</span>
          <div>
            <button class="complete-task btn btn-sm btn-success"><i class="bi bi-check-lg"></i></button>
            <button class="edit-task btn btn-sm btn-warning"><i class="bi bi-pencil-square"></i></button>
            <button class="delete-task btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
          </div>
        `;

        const deleteBtn = li.querySelector('.delete-task');
        const editBtn = li.querySelector('.edit-task');
        const completeBtn = li.querySelector('.complete-task');
  
        deleteBtn.addEventListener('click', function () {
          li.classList.add('remove-animation');
          setTimeout(() => {
            tasks.splice(index, 1);
            renderTasks();
            updateTaskCount();
          }, 300);
        });
  
        editBtn.addEventListener('click', function () {
          const newTaskValue = prompt("Editar tarefa", task.text);
          if (newTaskValue) {
            task.text = newTaskValue;
            renderTasks();
          }
        });
  
        completeBtn.addEventListener('click', function () {
          tasks[index].completed = !tasks[index].completed;
          renderTasks();
          updateTaskCount();
        });
  
        taskList.appendChild(li);
      });
    }
  
    function toggleDarkTheme() {
      document.body.classList.toggle('dark-mode');
      toggleDarkMode.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
    }
  });
  