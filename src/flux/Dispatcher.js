export class Dispatcher {
    constructor(){
        this.__listeners = [];
    }
    dispatch(action){
        this.__listeners.forEach(listener=>listener(action));
    }
    register(listener){
        this.__listeners.push(listener);
    }
}