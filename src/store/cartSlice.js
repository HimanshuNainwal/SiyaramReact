
import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cart', 
    initialState:{cartId:null,cartSession:null,cartQuantity:0,cartProducts:null,cartData:null},
    reducers:{
        setCartInfo(state,action){
            state.cartId = action.payload.cartId;
            state.cartSession = action.payload.cartSession;
            // state.cartQuantity = action.payload.cartProducts.length;
            // state.cartProducts = action.payload.cartProducts;
        } ,
        updateCartQuantity(state,action){
            state.cartQuantity= action.payload.cartQuantity
        },
        setCartData(state,action){
            state.cartQuantity = action.payload.cartProducts.length;
            state.cartProducts = action.payload.cartProducts
            state.cartData = action.payload.cartData
        }


    }

})
export const cartActions = cartSlice.actions

export default cartSlice