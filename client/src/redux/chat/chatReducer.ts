import { ChatInitialStateType, MessagesActionsType } from './types'
import { ChatActions } from './actions'

const initialState: ChatInitialStateType = {
    messages: []
}

export const chatReducer = (state: ChatInitialStateType = initialState, action: MessagesActionsType): ChatInitialStateType => {
    switch (action.type) {

        case ChatActions.SET_INIT_MESSAGES:
            return {
                ...state,
                messages: action.payload.messages
            }

        case ChatActions.UPDATE_MESSAGES:
            return {
                ...state,
                messages: action.payload.messages
            }

        case ChatActions.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }

        default:
            return state
    }
}