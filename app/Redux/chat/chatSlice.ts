import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// interface IMessage {
//   message: string
//   type: string
// }

export interface IListsState {
  lists: Array<any>
}

const initialState: IListsState = {
  lists: [
    // {
    //   message: 'this is template messagethis is template messagethis is template messagethis is template messagethis is template messagethis is template messagethis is template messagethis is template message',
    //   type: 'bot',
    // },
    // {
    //   message: 'this is template message',
    //   type: 'bot',
    // },
    // {
    //   message: 'this is template user message',
    //   type: 'user',
    // },
  ],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatList: (state, action: PayloadAction<Object>) => {
      state.lists = [...state.lists, action.payload]
    },
  },
})

export const { addChatList } = chatSlice.actions
export const chatReducer = chatSlice.reducer
