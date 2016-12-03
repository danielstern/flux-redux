import { createStore } from 'redux'
const state = {
    messages:[{
        date:new Date(),
        postedBy:`Stan`,
        content:`I <3 the new productivity app`
    },{
        date:new Date() + 1,
        postedBy:`Jerry`,
        content:`No one ever got fired for using Redux...`
    },{
        date:new Date() + 1,
        postedBy:`Llewlyn`,
        content:`Anyone got tickets to ng-conf?`
    }]
}
export const CREATE_NEW_MESSAGE = `CREATE_NEW_MESSAGE`;

const newMessageAction = (content, postedBy)=>{
    return {
        type: CREATE_NEW_MESSAGE,
        value: content,
        postedBy
    }
}

const reducer = (state = state, action) => {
    return state;
}

const store = createStore(reducer, state);
const render = ()=>{
    const messages = store.getState().messages;
    document.getElementById("messages").innerHTML = messages
        .sort((a,b)=>b.date - a.date)
        .map(message=>(`
    <div> 
        ${message.postedBy} : ${message.content}
    </div>`
    )).join("");

}
// debugger;
render();

store.subscribe(render)