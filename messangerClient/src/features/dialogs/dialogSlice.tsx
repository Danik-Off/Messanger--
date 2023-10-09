import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '../../stores/store'
import axios from 'axios';
import { GetDialogsUrl } from '../../routes/routes';

export const fetchDialogs = createAsyncThunk(
    'users/fetchUserById', // отображается в dev tools и должно быть уникально у каждого Thunk
    async (userId) => {
      // Здесь только логика запроса и возврата данных
      // Никакой обработки ошибок
      const response = await axios.get(GetDialogsUrl);
      return response.data;
    }
  );

interface DialogState {
 peer_id:number;
 msgs:Message[];
 loadingStatus: 'idle' | 'loading' | 'failed';
 error: any;
}

const initialState: DialogState = {
    peer_id: 0,
    msgs: [],
    loadingStatus: 'idle',
    error: null,
}
const msgsAdapter = createEntityAdapter();

export const dialogSlice = createSlice({
  name: 'dialogs',
 
  initialState: msgsAdapter.getInitialState({ loadingStatus: 'idle', error: '' }),
  reducers: {
   
  },
  
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(fetchDialogs.pending, (state) => {
        state.loadingStatus = 'loading';

      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(fetchDialogs.fulfilled, (state, action) => {
        // Добавляем пользователя
        msgsAdapter.addOne(state, action);
        state.loadingStatus = 'idle';
       
      })
      // Вызывается в случае ошибки
      .addCase(fetchDialogs.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
         state.error = action.error as string;
      });
    }
})


export const {  } = dialogSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default dialogSlice.reducer