import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: []
    },
    reducers: {
        addUser(state, action) {
           
            state.user.push(action.payload);
        },
        removeUser(state, action) {
            console.log(state.user);
            console.log( state.user.filter((item) => item.id != action.payload));
            state.user= state.user.filter((item) => item.id != action.payload)
        },
        setUser: (state, { payload }) => {
            state.user = payload
        },
        addUserPayDetails(state,action){
           state.user.push(action.payload);
        },
        addUserRecieveDetails(state,action){
            state.user.push(action.payload);
        }
    }
})

export const { addUser, removeUser, setUser ,addUserPayDetails,addUserRecieveDetails } = userSlice.actions;

export default userSlice.reducer;