import axios from 'axios'
import { toast } from 'react-toastify';

import { cartActions } from "./cartSlice"


const cartBaseApiUrl = "https://sy.cartkm.greenhonchos.com/api/v1"


export const fetchCartData = () => {
    return async (dispatch,getState) => {
        const state = getState()
       
        const sendRequest = async () => {   
            
            const form = new FormData()
            form.append('cart_id',state.cart.cartId)
            form.append('cart_session',state.cart.cartSession)


            const response = await axios.post(`${cartBaseApiUrl}/cart/get-cart`,form)
           
            if(response.data.success){
                dispatch(cartActions.setCartData({cartProducts:response.data.data.products,cartData:response.data.data}))
            }else{
                throw new Error("Oops Something Went Wrong")
            }
        }
      
        try{
         
            sendRequest()
        }catch(err){
           
            toast.error(err, { position: toast.POSITION.TOP_CENTER })
        }
    }

}
export const removeCartProduct = (id) => { 
    return async (dispatch,getState) => {
        const state = getState()
        
            const sendRequest = async () => {   
            
                const form = new FormData()
                form.append('cart_id',state.cart.cartId)
                form.append('cart_session',state.cart.cartSession)
                form.append('product_id',id)

                const response = await axios.post(`${cartBaseApiUrl}/product/remove-product`,form)
                if(response.data.success){
                    dispatch(cartActions.setCartData({cartProducts:response.data.data.products,cartData:response.data.data}))
                    toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER })
                }else{
                    throw new Error("Oops Something Went Wrong")
                }
            }
           
            try{
               
                sendRequest()
            }catch(err){
               
                toast.error(err, { position: toast.POSITION.TOP_CENTER })
            }
    }
}
export const updateCartProduct = (qty,id) => { 
    return async (dispatch,getState) => {
        const state = getState()
        
            const sendRequest = async () => {   
            
                const form = new FormData()
                form.append('cart_id',state.cart.cartId)
                form.append('cart_session',state.cart.cartSession)
                form.append('product_id',id)
                form.append('qty_ordered',qty)

                const response = await axios.post(`${cartBaseApiUrl}/product/update-product`,form)
                
                if(response.data.success){
                    dispatch(cartActions.setCartData({cartProducts:response.data.data.products,cartData:response.data.data}))
                    toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER })
                }else{
                    throw new Error("Oops Something Went Wrong")
                }
            }
           
            try{
               
                sendRequest()
            }catch(err){
               
                toast.error(err, { position: toast.POSITION.TOP_CENTER })
            }
    }
}
