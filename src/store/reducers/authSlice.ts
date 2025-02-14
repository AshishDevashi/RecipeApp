import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        userData: {},
    },
    reducers: {
        setLogout: (state) => {
            state.isLogin = false;
            state.userData = {};
        },
        setLogin: (state, action) => {
            state.isLogin = true;
            state.userData = action.payload;
        },
    },
});

// export { CONSTANTS } = authSlice.actions;
export const { setLogout, setLogin } = authSlice.actions;
export default authSlice.reducer;