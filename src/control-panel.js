import { Dispatcher, Store } from './flux';

const controlPanelDispatcher = new Dispatcher();

export const UPDATE_USERNAME = `UPDATE_USERNAME`;
export const UPDATE_FONT_SIZE_PREFERENCE = `UPDATE_FONT_SIZE_PREFERENCE`;

const userNameUpdateAction = (name)=>{
    return {
        type: UPDATE_USERNAME,
        value: name
    }
}

const fontSizePreferenceUpdateAction = (size)=>{
    return {
        type: UPDATE_FONT_SIZE_PREFERENCE,
        value: size
    }
}
//
class UserPrefsStore extends Store {
    getInitialState() {
        return localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]) : {
            userName: "Jim",
            fontSize: "small"
        };
    }
    __onDispatch(action){
        switch(action.type) {
            case UPDATE_USERNAME:
                this.__state.userName = action.value;
                this.__emitChange();
                break;
            case UPDATE_FONT_SIZE_PREFERENCE:
                this.__state.fontSize = action.value;
                this.__emitChange();
                break;
        }
    }
    getUserPreferences(){
        return this.__state;
    }
}

const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);
const userNameInput = document.getElementById(`userNameInput`);
userNameInput.addEventListener("input",({target})=>{
    const name = target.value;
    controlPanelDispatcher.dispatch(userNameUpdateAction(name));
});

const fontSizeForm = document.forms.fontSizeForm;

fontSizeForm.fontSize.forEach(element=>{
    element.addEventListener("change",({target})=>{
        console.log("Buton change...",target.value);
        controlPanelDispatcher.dispatch(fontSizePreferenceUpdateAction(target.value));
    })
});

const render = ({userName,fontSize})=>{
    document.getElementById("userName").innerText = userName;
    document.getElementsByClassName("container")[0].style.fontSize = fontSize === "small" ? "16px" : "24px";
    fontSizeForm.fontSize.value = fontSize;

}

userPrefsStore.addListener((state)=>{
    render(state);
    saveUserPreferences(state);
});

const saveUserPreferences =(state)=>{
    localStorage[`preferences`] = JSON.stringify(state);
}

render(userPrefsStore.getUserPreferences());