import { generate as id } from 'shortid';
import { Dispatcher, ReduceStore } from './flux';

const tasksDispatcher = new Dispatcher();

const CREATE_TASK = `CREATE_TASK`;
const COMPLETE_TASK = `COMPLETE_TASK`
const SHOW_TASKS = `SHOW_TASKS`;

const createNewTaskAction = (content)=>{
    return {
        type: CREATE_TASK,
        value: content
    }
}

const completeTaskAction = (id,isComplete)=>{
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
        let newState;
        switch(action.type) {
            case CREATE_TASK:
                newState = { ...state, tasks: [ ... state.tasks ]};
                newState.tasks.push({
                    id:id(),
                    content:action.value,
                    complete: false
                })
                return newState;
                break;
            case COMPLETE_TASK:
                console.log("THE TASK IS COMPLETED?",action);
                // debugger;
                newState = { ... state, tasks: [ ... state.tasks ]};
                const affectedElementIndex = newState.tasks.findIndex(t=>t.id === action.id);
                newState.tasks[affectedElementIndex] = { ... state.tasks[affectedElementIndex], complete: action.value }

                return newState;

                break;
        }
        return state;
    }
    getState(){
        return this.__state;
    }
}

const tasksStore = new TasksStore(tasksDispatcher);

const TaskComponent = ({content,complete,id})=>(
    `<div>${content} - <input type="checkbox" name="taskCompleteCheck" data-taskid=${id} ${complete ? "checked" : ""}> </div>`
)

// const handleTaskComplete = (e) =>{
//     console.log(e);
// }

const render = () => {
    const tasksSection = document.getElementById(`tasks`);
    const rendered = tasksStore.getState().tasks.map(TaskComponent).join("");
    tasksSection.innerHTML = rendered;
    document.getElementsByName('taskCompleteCheck').forEach(element=>{
        element.addEventListener('change',(e)=>{
            const id = e.target.attributes['data-taskid'].value;
            const checked= e.target.checked;
            tasksDispatcher.dispatch(completeTaskAction(id,checked));
        })
    })
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

tasksStore.addListener(()=>{
    render();
})

render();