import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { GetMsgsUrl } from "../../routes/routes";

export const fetchMsgs = createAsyncThunk(
  "msgs/fetchMsgs", // Убедитесь, что имя уникально и отражает операцию
  async (peer_id: number) => {
    try {
      const response = await axios.get(GetMsgsUrl(peer_id));
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

export const msgsSlice = createSlice({
  name: "msgs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMsgs.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchMsgs.fulfilled, (state, action) => {
        msgsAdapter.setAll(state, action.payload);
        
        state.loadingStatus = "idle";
      })
      .addCase(fetchMsgs.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = msgsSlice.actions;

export const selectMsgsState = (state: any) => state.msgs;

export const selectMsgs = createSelector(selectMsgsState, (msgs) =>
  msgsAdapter.getSelectors().selectAll(msgs)
);

export default msgsSlice.reducer;
