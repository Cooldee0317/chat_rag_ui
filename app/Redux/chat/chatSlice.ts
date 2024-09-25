import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// interface IMessage {
//   message: string
//   type: string
// }

export interface IListsState {
  lists: Array<any>,
  writing_status: boolean
}

const initialState: IListsState = {
  lists: [
    // {
    //   message: `Painting a room can be a rewarding DIY project if done correctly. Here's a step-by-step guide to help you get started:\n\n1. **Preparation**:\n   - **Clear the Room**: Remove or cover furniture and items.\n   - **Clean the Walls**: Dust and clean surfaces to ensure paint adheres well.\n   - **Repair Imperfections**: Fill holes or cracks with spackle, then sand smooth.\n   - **Tape and Cover**: Use painter's tape to protect edges, trim, and baseboards. Cover floors with drop cloths.\n\n2. **Priming**:\n   - **Prime the Walls**: Applying a primer helps paint adhere better and evens out the surface. This is especially important if you're painting over dark colors or stains.\n\n3. **Choosing Paint**:\n   - **Select the Right Paint**: Consider the type of room and surface. For example, use moisture-resistant paint for bathrooms.\n\n4. **Painting**:\n   - **Cut In Edges**: Start by painting the edges with a brush, where rollers can't reach.\n   - **Use a Roller**: For larger areas, use a roller. Apply paint in a \"W\" pattern to ensure even coverage.\n   - **Multiple Coats**: Apply at least two coats of paint, allowing sufficient drying time between each.\n\n5. **Finishing**:\n   - **Remove Tape**: Carefully remove painter's tape before the paint fully dries to avoid peeling.\n   - **Clean Up**: Clean brushes and rollers immediately after use.\n\nFor more specific product recommendations, feel free to enquire further. Enjoy your painting project!`,
    //   type: 'bot',
    // },
    // {
    //   message: '<h4>this is template message</h4>',
    //   type: 'bot',
    // },
    // {
    //   message: 'this is template user message',
    //   type: 'user',
    // },
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
