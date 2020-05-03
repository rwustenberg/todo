const listsContainer = document.querySelector(["data-lists"]);

let lists = [
  { id: 1, name: "name" },
  { id: 2, name: "todo" },
];
//clears item from list
let render = () => {
  clearElement(listsContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    listsContainer.appendChild(listElement);
  });
};

let clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
render();
