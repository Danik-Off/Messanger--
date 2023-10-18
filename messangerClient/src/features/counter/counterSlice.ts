import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../stores/store'


interface CounterState {
  value: boolean
}
const initialState: CounterState = {
  value: false,
}

export const counterSlice = createSlice({
  name: 'counter',
 
  initialState,
  reducers: {

    incrementByAmount: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
});


export const { incrementByAmount } = counterSlice.actions

export const selectLeftMenu = (state: RootState) => state.counter.value

export default counterSlice.reducer