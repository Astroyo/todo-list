
let input = document.getElementById("input");
let button = document.getElementById("button");
let list = document.getElementById("list");
let todos = document.querySelectorAll("li")

let toggleToDo = (tag) => {
    tag.addEventListener("click", () => {
        tag.classList.toggle("done");
    })
}

let removeToDo = (container, tag) => {
    tag.addEventListener("click", () => {
        container[0].remove()
        container[1].remove()
    })
}

let newToDo = () => {
    let div = document.createElement("div");


    let li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
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
    newToDo()
});


input.addEventListener("keypress", event => {
    if (input.value.length > 0 && event.key === "Enter") {
        newToDo()
    }
});


