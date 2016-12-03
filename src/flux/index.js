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

export class Store {
    constructor(dispatcher){
        this.__listeners = [];
        this.__state = this.getInitialState();
        dispatcher.register(this.__onDispatch.bind(this));
    }
    getInitialState(){
        throw new Error("Subclasses must override getInitialState method of a Flux Store");
    }
    __onDispatch(){
        throw new Error("Subclasses must override __onDispatch method of a Flux Store");
    }
    addListener(listener){
        this.__listeners.push(listener);
    }
    __emitChange(){
        this.__listeners.forEach(listener=>listener(this.__state));
    }

}

export class ReduceStore extends Store {
    constructor(dispatcher){
        super(dispatcher);
        this.__history = [];
    }
    reduce(state,action){
        throw new Error("Subclasses must implement reduce method of a Flux ReduceStore");
    }
    __onDispatch(action){
        const newState = this.reduce(this.__state,action);
        if (newState !== this.__state) {
            console.log("Reducer has changed the state");
            this.__history.push(this.__state);
            this.__state = newState;
            this.__emitChange();
        }
    }
    revertLastState(){
        if (this.__history.length > 0)
        this.__state = this.__history.pop();
        this.__emitChange();
    }

}