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

const testAddTodo = () => {

    const stateBefore = []
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text:'Learn Redux'
    }

    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)

    
}

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: 'false'
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ]
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }

    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: 'false'
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ]

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(
        todos(stateBefore,action)
    ).toEqual(stateAfter)
}

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



testAddTodo();
testToggleTodo();
console.log('All test passed')
