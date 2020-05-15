//selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('#filter');

//event listener
todoButton.addEventListener('click', addItem);
todoList.addEventListener('click', deleteAndChecked);
filter.addEventListener('change', filterList);

//function

function filterList(event) {
    const list = todoList.children;

    switch (filter.value) {
        case 'checked':       
            Array.from(list).filter((child) => {
                if (child.className.includes('completed')){
                    child.style.display = 'flex';
                }else {
                    child.style.display = 'none';
                }
            })
            break;

        case 'uncheck':
            Array.from(list).filter((child) => {
                if (!child.className.includes('completed')){
                    child.style.display = 'flex';
                }else {
                    child.style.display = 'none';
                }
            })
            break;

        case 'all':
            Array.from(list).filter((child) => {
                    child.style.display = 'flex';
            })
            break;
    }
}

function deleteAndChecked(event) {
    
    const target = event.target;

    if (target.classList[0] === 'delete-button') {
        const item = target.parentElement;
        item.classList.add('fall');
        item.addEventListener('transitionend', () => item.remove());
    }

    else if (target.classList[0] === 'checked-button') {
        const item = target.parentElement;
        item.classList.toggle('completed');
    }
}

function addItem(event) {
    //prevent form submitting
    event.preventDefault();

    //create div ---> create li
    const divItem = document.createElement('div');
    divItem.classList.add('todo-item');

    const liTodoThing = document.createElement('li');
    liTodoThing.classList.add('todo-thing');
    liTodoThing.innerText = todoInput.value;

    divItem.appendChild(liTodoThing);

    //create check & delete button
    const checkedButton = document.createElement('button');
    checkedButton.classList.add('checked-button');
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    divItem.appendChild(checkedButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    divItem.appendChild(deleteButton);

    //append to list
    todoList.appendChild(divItem);
    
    //clear input
    todoInput.value = '';
}

