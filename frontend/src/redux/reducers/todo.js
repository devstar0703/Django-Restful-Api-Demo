

import ActionTypes from "../actions/actionTypes";


const INITIAL_STATE = {
    todosList : [

    ],
    message : ''
}

export default (state=INITIAL_STATE , action={}) => {
    switch (action.type) {
        case ActionTypes.GetTodos :
            return ({
                ...state ,
                todosList : action.payload
            });
        case ActionTypes.GetTodosError :
            return ({
                ...state ,
                message : action.payload ,
                todosList : []
            })
        case ActionTypes.AddTodo :
            return ({
                ...state , 
                todosList : action.payload
            })
        case ActionTypes.GetTodoById :
            return ({
                ...state ,
                todosList : action.payload
            })
        case ActionTypes.DeleteTodo :
            return ({
                ...state ,
                todosList : action.payload
            })
        default :
            return state ;
    }
}