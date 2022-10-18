import { createSlice } from "@reduxjs/toolkit";



const accountSlice = createSlice({
    name:"account",
    initialState:{customerId:null,customerSession:null,userDetails:null,customerName:"",customerPhone:""},
    reducers:{
        setAccountInfo(state,action){

            state.customerId = action.payload.userData.customer_id
            state.customerSession = action.payload.userData.customer_session
            state.userDetails = action.payload.userData
            state.customerDetails = action.payload.userData.customer
            state.customerName = action.payload.userData.customer.full_name
            state.customerPhone = action.payload.userData.customer.phone
            state.is_login = action.payload.is_login


        },
        setSessionInfo(state,action){

            state.customerName = action.payload.userData.full_name
            state.customerPhone = action.payload.userData.phone
            
            state.is_login = action.payload.userData.is_login

        },
        setCustomer(state,action){
            state.customerId = action.payload.customer_id
            state.customerSession = action.payload.customer_session
        }
    }
})

export const accountAction = accountSlice.actions
export default accountSlice