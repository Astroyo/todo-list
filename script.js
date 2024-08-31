// Fix this shit code and make it humane

const input = document.getElementById("input");
const button = document.getElementById("button");
const list = document.getElementById("list");
const todos = document.querySelectorAll("li")

const toggleToDo = tag => {
    tag.addEventListener("click", () => {
        tag.classList.toggle("done");
    })
}

const removeToDo = (container, tag) => {
    tag.addEventListener("click", () => {
        const value = container[0].firstChild.nodeValue
        todosStorage.removeText(value)
        container[0].remove()
        container[1].remove()
    })
}

const newToDo = value => {
    let div = document.createElement("div");

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(value));
    div.appendChild(li);
    toggleToDo(li)
    input.value = "";

    let removeButton = document.createElement("button");
    removeButton.appendChild(document.createTextNode("delete"));
    removeButton.classList.add("remove-button", "material-symbols-outlined")
    div.appendChild(removeButton);
    // removeToDo(div, removeButton);
    removeToDo([li, removeButton], removeButton);

    div.classList.add("todo");
    // list.appendChild(div);
    list.appendChild(li);
    list.appendChild(removeButton);
}


button.addEventListener("click", () => {
    if (!(input.value.length > 0)) { return; }
    todosStorage.addText(input.value)
    newToDo(input.value)
});


input.addEventListener("keypress", event => {
    if (input.value.length > 0 && event.key === "Enter") {
        todosStorage.addText(input.value)
        newToDo(input.value)
    }
});




class TodosStorage {
    constructor(storageKey = 'todos') {
        this.storageKey = storageKey;
    }

    // Get all todos from storage
    getAllTexts() {
        const storedData = localStorage.getItem(this.storageKey);
        return storedData ? JSON.parse(storedData) : [];
    }

    // Add a new todos to storage
    addText(todo) {
        const todos = this.getAllTexts();
        todos.push(todo);
        localStorage.setItem(this.storageKey, JSON.stringify(todos));
    }

    // Remove a specific todos from storage
    removeText(todo) {
        let todos = this.getAllTexts();
        todos = todos.filter(storedName => storedName !== todo);
        localStorage.setItem(this.storageKey, JSON.stringify(todos));
    }

    // Remove all todos (clear storage)
    removeAllTexts() {
        localStorage.removeItem(this.storageKey);
    }
}

const todosStorage = new TodosStorage();

document.addEventListener('DOMContentLoaded', () => {
    todosStorage.getAllTexts().forEach(todo => newToDo(todo));
})