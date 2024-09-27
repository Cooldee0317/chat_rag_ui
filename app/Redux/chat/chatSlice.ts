import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// interface IMessage {
//   message: string
//   type: string
//   response_type?: string
// }

export interface IListsState {
  lists: Array<any>,
  writing_status: boolean
}

const initialState: IListsState = {
  lists: [
    {
      message: 'Welcome to Paint Assistence! You can choose one of the following options or ask me anything regarding home renovation or painting! I will be glad to help.🎨',
      type: 'bot',
      response_type: 'INITIAL MESSAGE'
    },
  ],
  writing_status: false
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatList: (state, action: PayloadAction<Object>) => {
      state.lists = [...state.lists, action.payload]
    },
    changeWriteStatus: (state, action: PayloadAction<boolean>) => {
      state.writing_status = action.payload
    }
  },
})

export const { addChatList, changeWriteStatus } = chatSlice.actions
export const chatReducer = chatSlice.reducer
