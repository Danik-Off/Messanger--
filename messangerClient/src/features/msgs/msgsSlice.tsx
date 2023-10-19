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
interface msgPayload {
  peer_id: number | undefined;
  msg: Message;
}

export const sendMsg = createAsyncThunk(
  "msgs/sendMsg", // Убедитесь, что имя уникально и отражает операцию
  async (data: msgPayload) => {
    if (data.peer_id) {
      try {
        const formData = new FormData();
        formData.append("text", data.msg.text);

        const response = await axios.post(GetMsgsUrl(data.peer_id), formData);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
);

interface MsgState {
  loadingStatus: "idle" | "loading" | "failed" | "send";
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
  reducers: {
    messageAdded: (state, action) => {
      msgsAdapter.addMany(state, action.payload);
      state.loadingStatus = "idle";
    }
  },
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
      })
      .addCase(sendMsg.pending, (state) => {
        state.loadingStatus = "send";
      })
      .addCase(sendMsg.fulfilled, (state, action) => {
        console.log(action);
      
      });
  },
});

export const {messageAdded} = msgsSlice.actions;

export const selectMsgsState = (state: any) => state.msgs;

export const selectMsgs = createSelector(selectMsgsState, (msgs) =>
  msgsAdapter.getSelectors().selectAll(msgs)
);

export default msgsSlice.reducer;
