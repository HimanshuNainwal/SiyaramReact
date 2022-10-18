import axios from "axios"
import { toast } from 'react-toastify';
import {accountAction} from './accountSlice'
import {cartActions} from './cartSlice'

import {getAccountDetails} from '../lib/account'


const baseApiUrl = 'https://sy.cartkm.greenhonchos.com/api/v1/customer'




export const sendOtp = async (phone) => { 

        try{
         
            const form = new FormData()
            form.append('phone',phone)
            
            
            const response = await axios.post(`${baseApiUrl}/send-otp`,form)
            if(response.data.success){
                toast.success(response.data.message,{ position: toast.POSITION.TOP_RIGHT})
                return response.data.success
            }else{
                toast.error('Oops Something Went Wrong',{ position: toast.POSITION.TOP_RIGHT})
                return response.data.success
            }
        }catch(err){
           
            
        }
   
}
export const validateOtp =  (phone,otp) => { 


    return async (dispatch,getState) => {
       
        // let response ;
        const state = getState()

        const sendRequest = async () => {   
            
            const form = new FormData()
            form.append('phone',phone)
            form.append('otp',otp)
            form.append('store',1)

            if(state.cart.cartId&& state.cart.cartSession){

                form.append('cart_id',state.cart.cartId)
                form.append('cart_session',state.cart.cartSession)
            }
    
            const response = await axios.post(`${baseApiUrl}/validate-otp`,form)
            if(response.data.success){
                dispatch(accountAction.setAccountInfo({userData:response.data.data,is_login:1}))
                dispatch(cartActions.setCartInfo({cartId:response.data.data.cart_id,cartSession:response.data.data.cart_session}))
                toast.success(response.data.message,{
                    position:toast.POSITION.TOP_RIGHT
                })

                localStorage.setItem('customerSession',response.data.data.customer_session)
                localStorage.setItem('customerId',response.data.data.customer_id)
                localStorage.setItem('cart_id', response.data.data.cart_id)
                localStorage.setItem('cart_session', response.data.data.cart_session)
                
                
            }else{
                toast.error(response.data.message,{
                    position:toast.POSITION.TOP_RIGHT
                })
                throw new Error(response.data.message)
            }

        }
      
        try{
            await sendRequest()
            
        }catch(err){
            
            toast.error(err.message, { position: toast.POSITION.TOP_CENTER })
        }
    }
}

export const accountDetails = () => {
    return async (dispatch,getState) =>{

        const state = getState()
        try{
            const form = new FormData()
            form.append('customer_id',state.account.customerId)
            form.append('customer_session',state.account.customerSession)
            form.append('store',1)

            const response = await getAccountDetails(form)
            console.log('console from thunk',response)
            dispatch(accountAction.setSessionInfo({userData:response.data.data}))
            
        }catch(err){
            
            toast.error(err.message, { position: toast.POSITION.TOP_CENTER })
        }  



    }
}



