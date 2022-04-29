import {createSlice} from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name:'loader',
    initialState:{
        loader:false
    },
    reducers:{
        toggleLoader(state){
            state.loader = !state.loader
        }
    }
})

export const loaderAction = loaderSlice.actions
export default loaderSlice.reducer