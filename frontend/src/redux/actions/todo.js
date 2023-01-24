
import ActionTypes from "./actionTypes"
import axios from 'axios' ;
import { BACKEND_URL } from "../../statics/constants";

export const GetTodoList = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjQwODgyNzIyLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjQwODc5MTIyfQ.o4L12gZBTK9vWflHGJ7bVemj6k6s7bGkoR0gFC2jrPI' }
        };

        let res = await axios.get(`${BACKEND_URL}/todos_list/` , {} );

        dispatch({
            type : ActionTypes.GetTodos ,
            payload : res.data
        })
    }
    catch (err) {
       console.log(err);
    }
}

export const AddTodo = (title , description , completed ) => async dispatch => {
    try {
        let res = await axios.post(`${BACKEND_URL}/todo_add/` , {title : title , description : description , completed : completed }) ;
        console.log(res.data) ;

        if( res.data.status === "Error New") {
            return dispatch({
                type  : ActionTypes.GetTodosError ,
                payload : res.data.status
            })    
        }
        
        return dispatch({
            type : ActionTypes.AddTodo ,
            payload : res.data
        })
    }
    catch (err) {
        console.log(err) ;
    }
} 

export const GetTodoByCond = (id , title , description) => async dispatch => {
    try {
        let res = await axios.post(`${BACKEND_URL}/todos_list/` ,{ id : id , title : title , description : description }) ;

        if(res.data.status === "Not Find Todo"){
            return dispatch({
                type : ActionTypes.GetTodosError,
                payload : "Not Find Todo"
            })
        }

        dispatch({
            type : ActionTypes.GetTodoById ,
            payload : res.data
        }) ;
    }
    catch (err) {
        console.log(err) ;
    }
}

export const DeleteTodoById = (id) => async dispatch => {
    try {
        let res = await axios.post(`${BACKEND_URL}/todo_delete/` , {id : id}) ;

        if(res.data.status === "Not Find Object") {
            return dispatch({
                type : ActionTypes.GetTodosError , 
                payload : res.data.status
            })
        }
        return dispatch({
            type : ActionTypes.DeleteTodo ,
            payload : res.data
        });
    }
    catch (e) {
        console.log(e) ;
    }
}