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

interface DialogState {
  dialogs: Dialog[];
  loadingStatus: "idle" | "loading" | "failed";
  error: any;
}

const dialogsAdapter = createEntityAdapter({
  selectId: (dialog: Dialog) => dialog.peer_id,
  // Инициализация дополнительных полей (если необходимо)
  // ...
});
const initialState = dialogsAdapter.getInitialState({
  loadingStatus: "idle",
  error: null,
} as DialogState);

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
        dialogsAdapter.setAll(state, action.payload);
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
export const selectDialogsState = (state: any) => state.dialogs;

// Селектор для получения массива диалогов
export const selectDialogs = createSelector(selectDialogsState, (dialogs) =>
  dialogsAdapter.getSelectors().selectAll(dialogs)
);

// Селектор для получения статуса загрузки
export const selectLoadingStatus = createSelector(
  selectDialogsState,
  (dialogs) => dialogs.loadingStatus
);

// Селектор для получения ошибки
export const selectError = createSelector(
  selectDialogsState,
  (dialogs) => dialogs.error
);

export default dialogSlice.reducer;
