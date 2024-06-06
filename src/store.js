import { configureStore } from '@reduxjs/toolkit'
//import songInfoReducer from './slices/audioVisualiser/songInfoSlice'

export default configureStore({
    reducer: {
        //songInfo: songInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})