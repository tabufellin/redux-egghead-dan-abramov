const todo = (state, action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            

        case 'TOGGLE_TODO':

            if (state.id !== action.id) {
                return state
            }

            return  {
                ...state,
                completed: !state.completed
            }
     
        default:
            return state
    }

}

const todos = (state = [], action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return [
                
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))

        default:
            return state

    }

};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
            
    }
}

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                )

                return nextState
            },
            {}
        )
    }
}


const { combineReducers } = Redux
const todoApp = combineReducers(
    {
        todos,
        visibilityFilter
    }
)
/*
const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    }
}
*/

const { createStore } = Redux
const store = createStore(todoApp)

console.log('Current State: ')
console.log(store.getState())
console.log('---------------------')

console.log('DISPATCHING')
console.log(store.dispatch(
    {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux',

    }
))
console.log('---------------------')


console.log('Current State: ')
console.log(store.getState())
console.log('---------------------')

console.log('DISPATCHING')
console.log(store.dispatch(
    {
        type: 'ADD_TODO',
        id: 1,
        text: 'gO SHOPPING',

    }
))


console.log('Current State: ')
console.log(store.getState())
console.log('---------------------')

console.log('DISPATCHING')
console.log(store.dispatch(
    {
        type: 'TOGGLE_TODO',
        id: 1,

    }
))

console.log('Current State: ')
console.log(store.getState())
console.log('---------------------')

console.log('DISPATCHING')
console.log(store.dispatch(
    {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_COMPLETED',

    }
))

console.log('Current State: ')
console.log(store.getState())
console.log('---------------------')

