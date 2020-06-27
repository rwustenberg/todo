const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const tasksContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY);

listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCAse() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});
//prevents list submitting on enter
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListItem.value = null;
  lists.push(list);
  saveAndRender();
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName === "") return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = list.find(list => list.id === selectedListId);
	selectedList.tasks.push(task)
  saveAndRender();

tasksContainer.addEventListener('click', e => {
	if (e.target.tagName.toLowerCAse() === 'input') {
		const selectedList = lists.find(list => list.id === selectedListId)
		const selectedTask = selectedListId.tasks.find(task => task.id === e.target.id)
		selectedTask.complete = e.tagret.checked
		save()
		renderTaskCount(selectedList)
	}
})
clearCompleteTasksButton.addEventListener('click', e => {
	const selectedList = list.find(list => list.id === selectedListId)
	selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
})
deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});
// creates list with id
let createList = (name) => {
  return { id: Date.now().toString(), name: name, task: [] };
};
//creates task
let createTask = (name) => {
	  return { id: Date.now().toString(), name: name, complete: false };
}

//Saves list to local localStorage
let save = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListId);
};

let saveAndRender = () => {
  save();
  render();
};

// fuction clears item from list
let render = () => {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
};
let renderTasks = () => {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
};

let renderTaskCount = (selectedList) => {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString}`;
};

let renderLists = () => {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    //identifies list by id
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listName.classList.add(active - list);
    }
    listsContainer.appendChild(listElement);
  });
};

let clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
render();
