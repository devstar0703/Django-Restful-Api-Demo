
const initialState = {
    userInfo : {
        email : "" ,
        password : ""
    }
}

const auth = (state=initialState , action={}) => {
    switch(action.type){
        case "INPUT" :
            return {
                ...state , 
                userInfo : action.payload
            }
        default:
            return state ;
    }
}

export default auth ;