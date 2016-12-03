import { generate as id } from 'shortid';

const tasks = [{
    id:id(),
    content:"Update CSS styles",
    complete:false
},{
    id:id(),
    content:"Add unit tests",
    complete:false
},{
    id:id(),
    content:"Post to social media",
    complete:false
}]
console.log(tasks);

const TaskComponent = ({content,complete})=>(
    `<div>${content} - <input type="checkbox" ${complete ? "checked" : ""} </div>`
)

const render = ({tasks}) => {
    const tasksSection = document.getElementById(`tasks`);
    const rendered = tasks.map(TaskComponent).join("");
    tasksSection.innerHTML = rendered;
}

render({tasks})