import { generate as id } from 'shortid';
import { Dispatcher, ReduceStore } from './flux';
import Immutable from 'immutable';

const tasksDispatcher = new Dispatcher();

const CREATE_TASK = `CREATE_TASK`;
const COMPLETE_TASK = `COMPLETE_TASK`
const SHOW_TASKS = `SHOW_TASKS`;

const state = new Immutable.OrderedMap();

const createNewTaskAction = (content)=>{
    return {
        type: CREATE_TASK,
        value: content
    }
}

const completeTaskAction = ({id,isComplete})=>{
    return {
        type: COMPLETE_TASK,
        id,
        value: isComplete
    }
}

const showTasksAction = (show)=>{
    return {
        type: SHOW_TASKS,
        value: show
    }
}

class TasksStore extends ReduceStore {
    getInitialState() {
        return {
            tasks: [{
                id: id(),
                content: "Update CSS styles",
                complete: false
            }, {
                id: id(),
                content: "Add unit tests",
                complete: false
            }, {
                id: id(),
                content: "Post to social media",
                complete: false
            }]
        };
    }
    reduce(state,action){
        switch(action.type) {
            case CREATE_TASK:
                console.log("CREATE TASK!");
                const newState = { tasks: [ ... state.tasks ]};
                newState.tasks.push({
                    id:id(),
                    content:action.value,
                    complete: false
                })
                return newState;
        }
        return state;
    }
    getTasks(){
        return this.__state.tasks;
    }
}

const tasksStore = new TasksStore(tasksDispatcher);

const TaskComponent = ({content,complete})=>(
    `<div>${content} - <input type="checkbox" ${complete ? "checked" : ""} </div>`
)

const render = ({tasks}) => {
    const tasksSection = document.getElementById(`tasks`);
    const rendered = tasksStore.getTasks().map(TaskComponent).join("");
    tasksSection.innerHTML = rendered;
}

document.forms.newTask.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = e.target.newTaskName.value;
    if (name) {
        tasksDispatcher.dispatch(createNewTaskAction(name));
        e.target.newTaskName.value = null;
    }
})

document.forms.undo.addEventListener('submit',(e)=>{
    e.preventDefault();
    tasksStore.revertLastState();
})

tasksStore.addListener((state)=>{
    console.log("Got state...",state);
    render(state);
})

render({tasks})