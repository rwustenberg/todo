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
  render();
});
deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});
// creates list with id
let createList = (name) => {
  return { id: Date.now().toString(), name: name, task: [] };
};
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
