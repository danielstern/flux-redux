console.log(`Message board`);
import { createStore } from 'redux'

export const ONLINE = `ONLINE`;
export const AWAY = `AWAY`;
export const BUSY = `BUSY`;
export const UPDATE_STATUS = `UPDATE_STATUS`;
export const OFFLINE = `OFFLINE`;

const statusUpdateAction = (value)=>{
    return {
        type: UPDATE_STATUS,
        value
    }
}



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
}



const reducer = (state=defaultState,{type,value})=>{
    switch (type) {
        case UPDATE_STATUS:
            return {...state, userStatus: value};
            break;
    }
    return state;
}

const store = createStore(reducer);

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
    document.forms.newMessage.fields.disabled = (userStatus === OFFLINE);
}

document.forms.selectStatus.status.addEventListener("change",(e)=>{
    store.dispatch(statusUpdateAction(e.target.value));
})

render();

store.subscribe(render);
