import { createStore, combineReducers } from 'redux'

export const ONLINE = `ONLINE`;
export const AWAY = `AWAY`;
export const BUSY = `BUSY`;
export const CREATE_NEW_MESSAGE = `CREATE_NEW_MESSAGE`;
export const UPDATE_STATUS = `UPDATE_STATUS`;

const defaultState = {
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
    }],
    userStatus: ONLINE
}


const newMessageAction = (content, postedBy)=>{
    return {
        type: CREATE_NEW_MESSAGE,
        value: content,
        postedBy
    }
}

const statusUpdateAction = (value)=>{
    return {
        type: UPDATE_STATUS,
        value
    }
}

const userStatusReducer = (state = ONLINE, {type, value}) => {
    switch (type) {
        case UPDATE_STATUS:
            return value;
    }
    return state;
}


const messageReducer = (state = defaultState.messages, {type, value}) => {
    switch (type) {
        case CREATE_NEW_MESSAGE:
            return value;
    }
    return state;
}

const combinedReducer = combineReducers({
    userStatus: userStatusReducer,
    messages: messageReducer
})

const store = createStore(combinedReducer, defaultState);
const render = ()=>{
    const messages = store.getState().messages;
    console.log(store.getState());
    document.getElementById("messages").innerHTML = messages
        .sort((a,b)=>b.date - a.date)
        .map(message=>(`
    <div> 
        ${message.postedBy} : ${message.content}
    </div>`
    )).join("");

}

render();

store.subscribe(render)