import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        userData: {},
        isDarkMode: false,
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
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        }
    },
});

// export { CONSTANTS } = authSlice.actions;
export const { setLogout, setLogin, setDarkMode } = authSlice.actions;
export default authSlice.reducer;