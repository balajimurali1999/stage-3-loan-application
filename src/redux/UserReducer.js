import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// if not working  try https://ide-fbecccadeabdedfcebceacafcdfdaafcdadabbbdecf.project.examly.io/proxy/8080
export let getUserDetails = createAsyncThunk("user/getUserDetails", (state) => {
    return axios
        .get("http://localhost:8080/peopleDetails",)
        .then((res) => res.data)
        .catch((err) => { console.log(err); state.user = [] });
});
const initialState = {
    user: [],
};

let UserReducer = createSlice({
    name: "User",
    initialState,
    extraReducers: (builder) => {
        console.log('hi')
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.user = action.payload;

        });
        builder.addCase(getUserDetails.pending, () => {

        });
        builder.addCase(getUserDetails.rejected, () => {
        });
    },
});
export default UserReducer.reducer;