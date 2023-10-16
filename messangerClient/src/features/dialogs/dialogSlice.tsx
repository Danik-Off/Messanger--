import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
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
  active_peer: number;
}

const dialogsAdapter = createEntityAdapter({
  selectId: (dialog: Dialog) => dialog.peer_id,
  // Инициализация дополнительных полей (если необходимо)
  // ...
});
const initialState = dialogsAdapter.getInitialState({
  loadingStatus: "idle",
  error: null,
  active_peer: 0,
} as DialogState);

export const dialogSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setActiveDialogPeer: (state, action: PayloadAction<number>) => {
      state.active_peer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialogs.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchDialogs.fulfilled, (state, action) => {
        dialogsAdapter.setAll(state, action.payload);
        state.loadingStatus = "idle";
        state.active_peer = action.payload[0].peer_id;
       
      })
      .addCase(fetchDialogs.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setActiveDialogPeer } = dialogSlice.actions;

export const selectActivePeer= (state:any) => state.dialogs.active_peer;
// Селектор для получения всего состояния диалогов
export const selectDialogsState = (state: any) => state.dialogs;

// Селектор для получения массива диалогов
export const selectDialogs = createSelector(selectDialogsState, (dialogs) =>
  dialogsAdapter.getSelectors().selectAll(dialogs)
);

export const selectActiveDialog = createSelector(
  selectDialogs,
  selectActivePeer,
  (dialogs, activePeer) => dialogs.find((dialog) => dialog.peer_id === activePeer)
);

export default dialogSlice.reducer;
