import { createStore, combineReducers, applyMiddleware } from 'redux'
import { get } from './http';
import logger from 'redux-logger';

export const ONLINE = `ONLINE`;
export const AWAY = `AWAY`;
export const BUSY = `BUSY`;
export const CREATE_NEW_MESSAGE = `CREATE_NEW_MESSAGE`;
export const NEW_MESSAGE_SERVER_ACCEPTED = `NEW_MESSAGE_SERVER_ACCEPTED`;
export const UPDATE_STATUS = `UPDATE_STATUS`;
export const OFFLINE = `OFFLINE`;
export const READY = `READY`;
export const WAITING = `WAITING`;



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
    userStatus: ONLINE,
    apiCommunicationStatus: READY
}


const newMessageAction = (content, postedBy, dispatch)=>{
    const date = new Date();

    // TODO... add asnychronicity to this action creator

    get('/api/create',(id=>{
        store.dispatch({
            type: NEW_MESSAGE_SERVER_ACCEPTED,
            value: content,
            postedBy,
            date,
            id
        })
    }));

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

const apiCommunicationStatusReducer = (state = READY, {type}) => {
    switch (type) {
        case CREATE_NEW_MESSAGE:
            return WAITING;
        case NEW_MESSAGE_SERVER_ACCEPTED:
            return READY;
    }
    return state;
}


const messageReducer = (state = defaultState.messages, {type, value, postedBy, date}) => {
    switch (type) {
        case CREATE_NEW_MESSAGE:
            const newState = [ { date: date, postedBy, content: value } , ... state ]
            return newState;
    }
    return state;
}

const combinedReducer = combineReducers({
    userStatus: userStatusReducer,
    messages: messageReducer,
    apiCommunicationStatus: apiCommunicationStatusReducer
})

const store = createStore(
    combinedReducer,
    applyMiddleware(logger())
);

const render = ()=>{
    const {messages, userStatus, apiCommunicationStatus} = store.getState();
    document.getElementById("messages").innerHTML = messages
        .sort((a,b)=>b.date - a.date)
        .map(message=>(`
    <div> 
        ${message.postedBy} : ${message.content}
    </div>`
    )).join("");

    document.forms.newMessage.newMessage.value = "";
    document.forms.newMessage.fields.disabled = (userStatus === OFFLINE) || (apiCommunicationStatus === WAITING);

}

document.forms.newMessage.addEventListener("submit",(e)=>{
    e.preventDefault();
    const value = e.target.newMessage.value;
    const username = localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]).userName : "Jim";
    store.dispatch(newMessageAction(value, username));
});

document.forms.selectStatus.status.addEventListener("change",(e)=>{
    store.dispatch(statusUpdateAction(e.target.value));
})

render();

store.subscribe(render)