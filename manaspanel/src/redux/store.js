import { configureStore } from '@reduxjs/toolkit'
import dynamicSliceReducer from '../redux/slices/dynamicSlice'

const store = configureStore({
    reducer: {     
        dynamic:dynamicSliceReducer
    },
    devTools: true
})

export default store