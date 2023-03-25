import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelId: null, 
    channelName: null
}

export const channelSLice = createSlice({
    name:"channel", 
    initialState: initialState,
    reducers: {
        setChannelInfo(state, action){
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
        }
    }
})

// export const actions = channelReducer.actions;

// the same i can do using useDispatch w componentach
export const { setChannelInfo} = channelSLice.actions;


// the same i can do using useSelector
export const selectChannelId = (state) => state.channel.channelId;
export const selectChannelName = (state) => state.channel.channelName;

export default channelSLice.reducer
