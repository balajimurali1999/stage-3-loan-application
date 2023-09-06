import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from '../components/applicationTracker/appTrackerSlice';
import userReducer from '../redux/UserReducer';
import LoanListReducer from "../redux/LoanListReducer";

const store = configureStore({
    reducer: {
        application: applicationReducer,
        user: userReducer,
        loan:LoanListReducer
    }
});

export default store;