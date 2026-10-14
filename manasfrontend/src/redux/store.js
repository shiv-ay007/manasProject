import { configureStore } from '@reduxjs/toolkit'
import parentSliceReducer from './Slice/Parent.slice'

const store = configureStore({
    reducer: {     
        parent:parentSliceReducer
    },
    devTools: true
})

export default store