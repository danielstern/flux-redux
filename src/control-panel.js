import { Dispatcher, Store } from './flux';

const controlPanelDispatcher = new Dispatcher();

export const UPDATE_USERNAME = `UPDATE_USERNAME`;
export const UPDATE_FONT_SIZE_PREFERENCE = `UPDATE_FONT_SIZE_PREFERENCE`;

document.forms.fontSizeForm.fontSize.forEach(element=>{
    element.addEventListener("change",({target})=>{
        controlPanelDispatcher.dispatch(UPDATE_USERNAME);
    })
});

document.getElementById(`userNameInput`).addEventListener("input",({target})=>{
    const name = target.value;
    controlPanelDispatcher.dispatch(UPDATE_FONT_SIZE_PREFERENCE);
});

class UserPrefsStore extends Store {
    getInitialState() {
        return {
            userName: "Jim",
            fontSize: "small"
        };
    }
    __onDispatch(action){
        console.info(`Received dispatch`, action);
        this.__emitChange();
    }
    getUserPreferences(){
        return this.__state;
    }
}

const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);

userPrefsStore.addListener((state)=>{
    console.log(`Updated Store`,state);
});


