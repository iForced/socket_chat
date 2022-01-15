import { combineReducers, createStore } from 'redux'
import { authReducer } from './auth/authReducer'

const rootReducer = combineReducers({
    authReducer,
})

export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>