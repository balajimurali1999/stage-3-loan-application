import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export let getLoanDetails = createAsyncThunk("loan/loanDetails", (state) => {
    return axios
        .get("http://localhost:8080/loanDetails",)
        .then((res) => res.data)
        .catch((err) => { console.log(err); state.loans = [] });
});
const initialState = {
    loan: [],
};

let LoanListReducer = createSlice({
    name: "Loan",
    initialState,
    extraReducers: (builder) => {
         builder.addCase(getLoanDetails.fulfilled, (state, action) => {
            state.loan = action.payload;
          });
        builder.addCase(getLoanDetails.pending, () => {
 
        });
        builder.addCase(getLoanDetails.rejected, () => {
         });
     },
});
export default LoanListReducer.reducer;