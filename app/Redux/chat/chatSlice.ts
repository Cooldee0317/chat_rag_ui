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
      content: 'Welcome to Paint Assistence! You can choose one of the following options or ask me anything regarding home renovation or painting! I will be glad to help.🎨',
      sender: 'bot',
      response_type: 'INITIAL MESSAGE'
    },
  ],
  writing_status: false
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatList: (state, action: PayloadAction<object>) => {
      state.lists = [...state.lists, action.payload]
    },
    changeWriteStatus: (state, action: PayloadAction<boolean>) => {
      state.writing_status = action.payload
    },
    addInfo: (state, action:PayloadAction<string>) => {
      state.lists[state.lists.length - 1].content += action.payload
    }
  },
})

export const { addChatList, changeWriteStatus, addInfo } = chatSlice.actions
export const chatReducer = chatSlice.reducer
