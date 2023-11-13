import { configureStore } from "@reduxjs/toolkit";
import viewReducer from '../Slicers/ViewSlice';

export const store = configureStore({
    reducer: {
        view: viewReducer,
    }
})