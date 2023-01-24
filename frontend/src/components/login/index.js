import React from 'react' ;

//----hook function
import { useState , useEffect , useRef } from 'react' ;

//----redux function
import {connect} from 'react-redux' ;
import PropType from 'prop-types' ;

//---action function
import { UserInfoChanged } from '../../redux/actions/auth' ;
import { GetTodoList , AddTodo  ,GetTodoByCond , DeleteTodoById} from '../../redux/actions/todo';
//----style
// import { makeStyles } from '@material-ui/core/styles' ;



const Login = (props) => {
    const {
        isLogged 
    } = props ;

    const [email , setUserEmail] = useState('') ;
    const [password, setUserPassword] = useState('') ;

    const [title, setTodoTitle] = useState('') ;
    const [description , setTodoDescription] = useState('');
    const [completed , setTodoCompleted] = useState(false) ;

    const [id, setTodoId] = useState('') ;

    const emailCtrl = useRef(null) ;

    useEffect(() => {
    
    } , [props.message])

    useEffect(() => {
        console.log(completed)
    } , [completed])
    useEffect(() => {

    } , [props.auth.userInfo , props.isLogged]);

    useEffect(() => {
        
    } , [props.todosList]) ;

    const renderUserInfo = () => {
        return (
            <>
                {props.auth.userInfo.email}
                +
                {props.auth.userInfo.password}
                +
                {isLogged}
            </>
        )
    }

    return (
        <>
            <form>
                Email: <input type="text" ref={emailCtrl} onChange={(e) => setUserEmail(e.target.value)} />
                <br />
                Password: <input type="text" onChange={ (e) => setUserPassword(e.target.value) } />
                <br />
                <input type="button" onClick={ () => props.UserInfoChanged(email , password)} value="Changed" />
            </form>
            { renderUserInfo() }
            <br />
            Title: <input type="text" onChange={(e) => setTodoTitle(e.target.value) } /><br />
            Description : <input type="text" onChange={(e) => setTodoDescription(e.target.value)} /><br />
            Completed : <input type="checkbox" onChange={(e) => setTodoCompleted(e.target.checked)} />
            <br />
            <button type="button" onClick={ () => props.AddTodo(title , description , completed) } >Add Todo</button>
            <button type="button" onClick = { () => props.GetTodoList()} >Get Todos</button>
            <br />
            {   
                props.todosList.map((row , i) => (
                        <div key={i}>
                            {row.id} - {row.title} - {row.description} - {row.completed}
                            <br />
                        </div>
                ))
            } 
            {
                props.message
            }
            <br/>
            Id: <input type="text" onChange={(e) => setTodoId(e.target.value)} />
            <br />
            Title : <input type="text" onChange={(e) => setTodoTitle(e.target.value)} />
            <br />
            Description : <input type='text' onChange={(e) => setTodoDescription(e.target.value)} />
            <br/>
            <button type="button" onClick= {() => props.GetTodoByCond(id , title , description)}>Get Specific Todo</button>
            <br />
            Id:<input type="text" onChange={(e) => setTodoId(e.target.value)} />
            <br/>
            <button type="button" onClick={(e) => props.DeleteTodoById(id)}>Delete Todo By ID</button>
        </>
    )
}

Login.PropsType = {
    UserInfoChanged : PropType.func.isRequired ,
    GetTodoByCond : PropType.func.isRequired ,
    DeleteTodoById : PropType.func.isRequired ,
    auth : PropType.object.isRequired ,
    isLogged : PropType.bool.isRequired ,
    todosList : PropType.array.isRequired ,
    message : PropType.string
}
const mapStateToProps = (state) => {
    return {
        auth : state.auth ,
        todosList : state.todo.todosList ,
        message : state.todo.message
    }
}
const mapDispatchToProps = {
    UserInfoChanged ,
    GetTodoList ,
    AddTodo ,
    GetTodoByCond ,
    DeleteTodoById
}


export default connect(mapStateToProps , mapDispatchToProps)(Login);