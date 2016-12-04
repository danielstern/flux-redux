# Flux-Redux Exemplar

## Getting started
To run application, run
```bash
npm install
```
Optional, globally install dev dependencies (recommended for Windows)

```bash
npm install -g webpack-dev-server webpack babel-preset-es2015 babel-plugin-transform-object-rest-spread babel-loader babel-core
```
Start the application
```bash
npm start
```

Finally, navigate to `http://localhost:8080/` in your browser.

### Structure
The application consists of three interconnected sub-applications with different implementations of Flux and Redux.

#### Control Panel
A basic form powered by a standards-compliant Flux implementation.

#### Tasks
A more advanced form based on the TodoMVC format, implementing a Flux ReduceStore. This form has `undo` functionality.

#### Message Board
A basic messaging tool similar to those found in most productivity apps. This sub-application implements Redux and contains asynchronous events.

### Glossary
#### Flux https://github.com/facebook/flux
Though available to download as a popular GitHub repository, Flux is actually simple enough to be implemented from scratch in under thirty minutes. In Flux, data is held in stores whose data cannot be changed by outside components. The store can change the data inside itself, and does so by listening to events emitted by the dispatcher. Flux also implements a ReduceStore, which has functionality that is highly similar to a Redux application. 
 
#### Facebook
An American company best known for the popular social media application. Developers working at Facebook, or who form part of the React community, are credited with creating Flux, as well as authoring and maintaining the React and Redux libraries. It has made an above-average contribution to the open source community.
#### Redux - https://github.com/reactjs/redux
A library which is growing in popularity at an extreme pace, Redux expands on the ReduceStore first implemented in Flux. Redux is more sophisticated than Flux, and is generally considered first when creating new applications. However, numerous contributors, notably Dan Abramov (credited with the invention of Redux), make a point of advising developers to seek more basic alternatives first, before using Redux. 

#### Reducer
An idempotent function, a reducer will always return the same output given the same arguments. Reducers usually take two arguments, an existing state and the action. If the action concerns the reducer in question (there can be many reducers in an application) it creates a copy of the state, modifies it accordingly, and returns that. Reducers, which never modify state, form the heart of all Redux applications.
#### Store
A structure for storing data, of which multiple are usually implemented for a Flux application, and just one for a Redux application. Usually, the data inside a store can be freely accessed but can not be changed from outside the store. In Flux, the store subscribes to actions which it then processes internally. After processing these actions, it emits a change letting other components access the new data. In a ReduceStore, and in Flux, stores must implement a function called a Reducer which never mutates state.

####Dispatcher
Functioning as an unremarkable event dispatcher, this is the component in a Flux application which every other component can have access to. Actions are sent to the the dispatcher before flowing down to other components of the application. In Redux, the dispatcher is built in to the store.
#### ReduceStore
A class which extends the Flux Store and implements a reducer. It emits changes automatically based on whether the reducer changes the state, and supports immutability and undo functionality well. Redux works very similarly to a Flux application implementing a ReduceStore. 
#### React https://github.com/facebook/react
A library for generating highly performant views created by some of the same team members as Flux. Though they are often taught and implemented together, React is just one possible view renderer that can be used with Redux or Flux (This project uses vanilla JavaScript as the view engine in order to remain unopinionated about the choice of view renderer).
#### React-Redux
A library containing helper functions which manage the repetitive tasks required to integrate React with Redux. As both React and Redux enforce unidirectional data flow and immutability, they integrate well together. Such applications tend to benefit both from the high-performance of React and the easy debugging of Redux.
#### Angular-Redux
Another library for connecting Redux to a common MVC framework. 