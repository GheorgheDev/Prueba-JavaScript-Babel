const BUTTONS_ADD = document.querySelectorAll('.columns__button-add');
const FORM = document.querySelector('.form');
const CANCEL_BUTTON = document.querySelector('#cancelButton');
const TYPE_COLUMN = document.querySelector('#typeColumn');
const COLUMNS = document.querySelectorAll('.columns__content');
let toDo = [];
let inProgress = [];
let toBeTested = [];
let done = [];

const DELETE_ALL_DATA_COLUMN = parentNode => {
    while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
    }
}

const SHOW_TASKS_COLUMN = (array, column) => {
    DELETE_ALL_DATA_COLUMN(column);
    const template = document.querySelector('#template');

    array.forEach(({ name, time, id }) => {
        const CLONE = template.content.cloneNode(true);
        const PARAGRAPH = CLONE.querySelector('p');
        const BUTTON_DELETE = CLONE.querySelector('.delete');
        const COLUMN = CLONE.querySelector('.columns__task');
        COLUMN.dataset.id = id;
        COLUMN.dataset.column = column.id;
        PARAGRAPH.textContent = `${name} - ${time}`;
        BUTTON_DELETE.dataset.id = id;
        BUTTON_DELETE.dataset.column = column.id;
        column.appendChild(CLONE);
    })
}

BUTTONS_ADD.forEach(button => {
    button.addEventListener('click', () => {
        SHOW_FORM(button);
    })
});

const SHOW_FORM = button => {
    switch (button.dataset.column) {
        case 'to do':
            TYPE_COLUMN.textContent = 'To Do';
            break;
        case 'in progress':
            TYPE_COLUMN.textContent = 'In Progress';
            break;
        case 'to be tested':
            TYPE_COLUMN.textContent = 'To Be Tested';
            break;
        case 'done':
            TYPE_COLUMN.textContent = 'Done';
            break;
    }

    FORM.classList.add('show');
}

CANCEL_BUTTON.addEventListener('click', () => {
    FORM.classList.remove('show');
})

FORM.addEventListener('submit', e => {
    ADD_TASK(e);
})

const ADD_TASK = e => {
    e.preventDefault();

    const DATA_FORM = Object.fromEntries(new FormData(e.target));
    DATA_FORM.id = Math.round(Date.now() * Math.random());

    switch (TYPE_COLUMN.textContent) {
        case 'To Do':
            const TO_DO_COLUMN = document.querySelector('#toDo');
            toDo.push(DATA_FORM);
            SHOW_TASKS_COLUMN(toDo, TO_DO_COLUMN);
            break;
        case 'In Progress':
            const IN_PROGRESS_COLUMN = document.querySelector('#inProgress');
            inProgress.push(DATA_FORM);
            SHOW_TASKS_COLUMN(inProgress, IN_PROGRESS_COLUMN);
            break;
        case 'To Be Tested':
            const TO_BE_TESTED_COLUMN = document.querySelector('#toBeTested');
            toBeTested.push(DATA_FORM);
            SHOW_TASKS_COLUMN(toBeTested, TO_BE_TESTED_COLUMN);
            break;
        case 'Done':
            const DONE_COLUMN = document.querySelector('#done');
            done.push(DATA_FORM);
            SHOW_TASKS_COLUMN(done, DONE_COLUMN);
            break;
    }

    e.target.reset();
}

COLUMNS.forEach(column => {
    column.addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            DELETE_TASK(e.target);
        }

        if (e.target.classList.contains('move-left')) {
            MOVE_LEFT(e.target);
        }
    })
})

const DELETE_TASK = e => {
    switch (e.dataset.column) {
        case 'toDo':
            const TO_DO_COLUMN = document.querySelector('#toDo');
            toDo = toDo.filter(({ id }) => id.toString() !== e.dataset.id);
            SHOW_TASKS_COLUMN(toDo, TO_DO_COLUMN);
            break;
        case 'inProgress':
            const IN_PROGRESS_COLUMN = document.querySelector('#inProgress');
            inProgress = inProgress.filter(({ id }) => id.toString() !== e.dataset.id);
            SHOW_TASKS_COLUMN(inProgress, IN_PROGRESS_COLUMN);
            break;
        case 'toBeTested':
            const TO_BE_TESTED_COLUMN = document.querySelector('#toBeTested');
            toBeTested = toBeTested.filter(({ id }) => id.toString() !== e.dataset.id);
            SHOW_TASKS_COLUMN(toBeTested, TO_BE_TESTED_COLUMN);
            break;
        case 'done':
            const DONE_COLUMN = document.querySelector('#done');
            done = done.filter(({ id }) => id.toString() !== e.dataset.id);
            SHOW_TASKS_COLUMN(done, DONE_COLUMN);
            break;
    }
}

const MOVE_LEFT = e => {
    console.log(e);
    console.log(e.parentNode);
    const PARENT_NODE = e.parentNode;
}