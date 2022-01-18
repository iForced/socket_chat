import { ChatInitialStateType, MessagesActionsType } from './types'
import { ChatActions } from './actions'

const initialState: ChatInitialStateType = {
    currentConversation: '',
    messages: []
}

export const chatReducer = (state: ChatInitialStateType = initialState, action: MessagesActionsType): ChatInitialStateType => {
    switch (action.type) {

        case ChatActions.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }

        case ChatActions.SET_CURRENT_CONVERSATION:
            return {
                ...state,
                currentConversation: action.payload.conversationId
            }

        default:
            return state
    }
}