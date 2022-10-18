import { createSlice } from "@reduxjs/toolkit"


const uiSlice  = createSlice({
    name:'UI',
    initialState:{page_loader:true},
    reducers:{
        toggleLoader(state,action){
            state.page_loader = action.payload
        }       

    }
})

export const uiActions = uiSlice.actions

export default uiSlice