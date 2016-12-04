import { createStore, combineReducers } from 'redux'

export const ONLINE = `ONLINE`;
export const AWAY = `AWAY`;
export const BUSY = `BUSY`;
export const CREATE_NEW_MESSAGE = `CREATE_NEW_MESSAGE`;
export const UPDATE_STATUS = `UPDATE_STATUS`;

const defaultState = {
    messages:[{
        date:new Date('2016-10-10 10:11:55'),
        postedBy:`Stan`,
        content:`I <3 the new productivity app!`
    },{
        date:new Date('2016-10-10 10:12:00'),
        postedBy:`Jerry`,
        content:`I don't know if the new version of Bootstrap is really better...`
    },{
        date:new Date('2016-10-10 12:06:04'),
        postedBy:`Llewlyn`,
        content:`Anyone got tickets to ng-conf?`
    }],
    userStatus: ONLINE
}


const newMessageAction = (content, postedBy)=>{
    const date = new Date();

    return {
        type: CREATE_NEW_MESSAGE,
        value: content,
        postedBy,
        date
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


const messageReducer = (state = defaultState.messages, {type, value, postedBy, date}) => {
    switch (type) {
        case CREATE_NEW_MESSAGE:
            console.log("Create message",value, state);
            const newState = [ { date: date, postedBy, content: value } , ... state ]
            return newState;
            // break;
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
    document.getElementById("messages").innerHTML = messages
        .sort((a,b)=>b.date - a.date)
        .map(message=>(`
    <div> 
        ${message.postedBy} : ${message.content}
    </div>`
    )).join("");

    document.forms.newMessage.newMessage.value = "";

}

document.forms.newMessage.addEventListener("submit",(e)=>{
    e.preventDefault();
    const value = e.target.newMessage.value;
    const username = localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]).userName : "Jim";
    store.dispatch(newMessageAction(value, username));
});

render();

store.subscribe(render)