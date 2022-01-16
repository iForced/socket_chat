import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { authReducer } from './auth/authReducer'
import { rootSaga } from './rootSaga'
import { chatReducer } from './chat/chatReducer'
import { usersReducer } from './users/usersReducer'

const rootReducer = combineReducers({
    authReducer,
    chatReducer,
    usersReducer,
})

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export type AppStateType = ReturnType<typeof rootReducer>