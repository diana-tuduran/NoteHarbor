import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    view: "login"
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setView: (state, action) => {
            state.view = action.payload;
        }
    }
})

export const {setView} = viewSlice.actions;

export default viewSlice.reducer;