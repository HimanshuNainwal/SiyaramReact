import { useCallback, useReducer } from "react"


const httpReducer = (state,action) => {
    


    if(action.type === "Send"){
       
        return {
            status:'Pending',
            data:null,
            error:null
        }
    }
    if(action.type === "Success") {
       
        
        return {
            status:'Success',
            data:action.responseData,
            error:null,
        }
    }
    if(action.type === 'Error'){
        
        return {
            status:'Error',
            data:null,
            error:action.errorMessage
        }
    }
}   

const useHttp = (requestFunction) => {
    const [httpState,dispatch] = useReducer(httpReducer,{status:null,data:null,error:null})

    const sendRequest = useCallback(
         async (requestData) => {
        dispatch({type:"Send"})
        try{    
            const response = await requestFunction(requestData)
         
            dispatch({type:"Success",responseData:response})
        }catch(err){
           
            dispatch({type:"Error",errorMessage:"Oops Something Went Wrong"})
        }
    
    },[requestFunction]
        
    )
    return {
        sendRequest,
        ...httpState
    }
}   

export default useHttp