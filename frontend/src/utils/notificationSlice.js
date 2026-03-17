import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        unreadMessages: 0,
        unreadRequests: 0,
    },
    reducers: {
        incrementMessages: (state) => {
            state.unreadMessages += 1;
        },
        clearMessages: (state) => {
            state.unreadMessages = 0;
        },
        incrementRequests: (state) => {
            state.unreadRequests += 1;
        },
        clearRequests: (state) => {
            state.unreadRequests = 0;
        },
        setInitialCounts: (state, action) => {
            if (action.payload.unreadMessages !== undefined) {
                state.unreadMessages = action.payload.unreadMessages;
            }
            if (action.payload.unreadRequests !== undefined) {
                state.unreadRequests = action.payload.unreadRequests;
            }
        }
    }
});

export const { incrementMessages, clearMessages, incrementRequests, clearRequests, setInitialCounts } = notificationSlice.actions;
export default notificationSlice.reducer;
