import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../stores/store'


interface DialogState {
 peer_id:number;
 msgs:Message[];
}

const initialState: DialogState = {
  peer_id:0,
  msgs:[],
}

export const dialogSlice = createSlice({
  name: 'counter',
 
  initialState,
  reducers: {
   
  },
})


export const {  } = dialogSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default dialogSlice.reducer