import { ChatInitialStateType } from './types'

const initialState: ChatInitialStateType = {
    messages: []
}

export const chatReducer = (state: ChatInitialStateType = initialState, action: any): ChatInitialStateType => {
    switch (action.type) {



        default:
            return state
    }
}