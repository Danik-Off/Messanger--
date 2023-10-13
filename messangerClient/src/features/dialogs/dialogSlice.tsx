import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetDialogsUrl } from '../../routes/routes';
import { json } from 'react-router-dom';

export const fetchDialogs = createAsyncThunk(
  'dialogs/fetchDialogs', // Убедитесь, что имя уникально и отражает операцию
  async () => {
    try {
      const response = await axios.get(GetDialogsUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


interface DialogState {
  dialogs: Dialog[];
  loadingStatus: 'idle' | 'loading' | 'failed';
  error: any;
}

const dialogsAdapter = createEntityAdapter<Dialog>();
const initialState = dialogsAdapter.getInitialState({
  dialogs: [],
  loadingStatus: 'loading',
  error: null,
} as DialogState);


export const dialogSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialogs.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchDialogs.fulfilled, (state, action) => {
        state.dialogs = action.payload;
        // dialogsAdapter.setOne(state, action.payload);
        state.loadingStatus = 'idle';
      })
      .addCase(fetchDialogs.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // state.error = action.error.message;
      });
  },
});

export const {  } = dialogSlice.actions;

export const selectDialogs = (state:any) => state;

export default dialogSlice.reducer;
