import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { GetDialogsUrl } from "../../routes/routes";
import { json } from "react-router-dom";

export const fetchDialogs = createAsyncThunk(
  "dialogs/fetchDialogs", // Убедитесь, что имя уникально и отражает операцию
  async () => {
    try {
      const response = await axios.get(GetDialogsUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface MsgState {
  loadingStatus: "idle" | "loading" | "failed";
  error: any;
}

const msgsAdapter = createEntityAdapter({
  selectId: (msg: Message) => msg.id,
});
const initialState = msgsAdapter.getInitialState({
  loadingStatus: "idle",
  error: null,
} as MsgState);

export const dialogSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialogs.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchDialogs.fulfilled, (state, action) => {
        msgsAdapter.setAll(state, action.payload);
        state.loadingStatus = "idle";
      })
      .addCase(fetchDialogs.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = dialogSlice.actions;

// Селектор для получения всего состояния диалогов
export const selectMsgsState = (state: any) => state.dialogs;

// Селектор для получения массива диалогов
export const selectMsgs = createSelector(
  selectMsgsState,
  (dialogs) => msgsAdapter.getSelectors().selectAll(dialogs)
);

// Селектор для получения статуса загрузки
export const selectLoadingStatus = createSelector(
  selectMsgsState,
  (dialogs) => dialogs.loadingStatus
);

// Селектор для получения ошибки
export const selectError = createSelector(
  selectMsgsState,
  (dialogs) => dialogs.error
);

export default dialogSlice.reducer;
