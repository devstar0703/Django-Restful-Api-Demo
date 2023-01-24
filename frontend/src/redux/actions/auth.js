

export const UserInfoChanged = ( email , password ) => async dispatch => {
    dispatch({
        type : "INPUT" ,
        payload : {
            email : email ,
            password : password
        }
    })
}