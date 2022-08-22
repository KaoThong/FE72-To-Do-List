var taskList = [];

function createTask() {
  var inputTask = document.getElementById("newTask").value;
  if (validateInput(inputTask)) {
    var taskItem = document.getElementById("newTask").value;
    var newTaskItem = new Task(taskItem, "todo");
    taskList.push(newTaskItem);
    console.log(taskList);
    renderTaskItem();
    setLocalStorage(taskList);
    document.getElementById('newTask').value = '';
    document.getElementById('notiInput').style.display = 'none'
  }
}

function findById(id) {
  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      return i;
    }
  }
  return -1;
}

function renderTaskItem() {
  var resultToDo = "";
  var resultComplete = "";
  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].status == "todo") {
      resultToDo += `
            <li>
                <p>${taskList[i].taskName}</p>
                <div>
                  <button onclick="handleDelete(${taskList[i].id})"><i class="fa-solid fa-trash-can"></i></button>
                  <button onclick="handleChangeStatus(${taskList[i].id})"><i class="fa-solid fa-circle-check"></i></button>
                </div>
              </li>
            `;
    } else {
      resultComplete += `
            <li>
                <p>${taskList[i].taskName}</p>
                <div>
                    <button onclick="handleDelete(${taskList[i].id})"><i class="fa-solid fa-trash-can"></i></button>
                    <button onclick="handleChangeStatus(${taskList[i].id})"><i class="fa-solid fa-circle-check"></i></button>
                </div>
                </li>
            `;
    }
  }
  document.getElementById("todo").innerHTML = resultToDo;
  document.getElementById("completed").innerHTML = resultComplete;
}

function handleDelete(id) {
  var index = findById(id);
  console.log(id);
  taskList.splice(index, 1);
  renderTaskItem();
  setLocalStorage(taskList);
}

function handleChangeStatus(id) {
  var index = findById(id);
  if (index === -1) alert("id khong ton tai");
  else {
    if (taskList[index].status == "todo") {
      taskList[index].status = "completed";
    } else {
      taskList[index].status = "todo";
    }
    console.log(taskList);
    renderTaskItem();
    setLocalStorage(taskList);
  }
}

function setLocalStorage(data) {
  localStorage.setItem("taskList", JSON.stringify(data));
}

function getLocalStorage() {
  var getTaskList = localStorage.getItem("taskList");
  if (getTaskList == null) return;
  taskList = JSON.parse(getTaskList);
  renderTaskItem();
}

getLocalStorage();

var updateId = 0;
function handleUpdate(id) {
    var index = findById(id);
    if (index === -1) {
        alert('ID invalid!!!')
    }
    else {
        document.getElementById('newTask').value = taskList[index].taskName;
        document.getElementById('addItem').style.display = 'none';
        document.getElementById('updateItem').style.display = 'block';
        updateId = taskList[index].id;
    }
}

function handleUpdateBtn() {
    var index = findById(updateId);
    if (index === -1) {
        updateId = 0;
        alert('ID invalid!!!');
    }
    else {
        var updateValue = document.getElementById('newTask').value;
        if(validateInput(updateValue)) {
            taskList[index].taskName = updateValue;
            saveLocal('tasks', taskList);
            renderTaskList(taskList);
            document.getElementById('newTask').value = '';
            document.getElementById('addItem').style.display = 'block';
            document.getElementById('updateItem').style.display = 'none';
            document.getElementById('notiInput').style.display = 'none'
            updateId = 0;
        }
    }
}


// Validation
function validateInput(data) {
  var isValid = true;
  isValid &= checkRequired(data);
  isValid &= checkSameTask(data);
  return isValid;
}

function checkRequired(input) {
  if (input.length > 0) return true;
  document.getElementById("notiInput").style.display = "block";
  document.getElementById("notiInput").innerHTML = "* Require";
  return false;
}

function checkSameTask(input) {
  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].taskName.toLowerCase() === input.toLowerCase()) {
      document.getElementById("notiInput").style.display = "block";
      document.getElementById("notiInput").innerHTML =
        "* Duplicated task, please add another!";
      return false;
    }
  }
  return true;
}
