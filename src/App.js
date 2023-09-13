import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./components/common/Header";
// import ApplicationTracker from "./components/applicationTracker/ApplicationTracker";
import SideBar from "./components/common/SideBar";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from "./redux/UserReducer";
import LoanForm from './components/LoanForm'
import LoanList from './components/LoanList';
import ViewLoan from './components/ViewLoan';
import Loginpage from "./components/Login";
import Dashboard from "./components/Dashboard";
import ApplicationTracker from "./components/applicationTracker/ApplicationTracker";
import { getLoanDetails } from "./redux/LoanListReducer";
import LoanStatistics from "./components/LoanStatistics";
import { useApiCalled } from "./context/ApiCallContext";
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersDetails = useSelector((state) => state.user.user);
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [emailId, setEmailId] = useState('');
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { apiCalled, setApiCalled } = useApiCalled();


  useEffect(() => {
    const dataGeneration = async () => {
      setEmailId(localStorage.getItem('emailId'))
      console.log('start')
      if (emailId && emailId.length === 0) {
        navigate('/login');
        console.log(emailId.length)
        console.log('in login check')
      } else {
        if (usersDetails.length === 0 || apiCalled) {
          dispatch(getUserDetails());
          console.log(usersDetails)
          setApiCalled(false);
        } else {
          const dataVal = usersDetails.find(ele => ele.email === emailId);
          if(dataVal && Object.keys(dataVal).length > 0) {
            setCurrentUserDetails(dataVal)
            console.log(dataVal, usersDetails)
            localStorage.setItem('role', dataVal.role);
            console.log('got current user')
            dispatch(getLoanDetails());
          }
        
        }
      }
    }
    return () => dataGeneration();
  }, [navigate, usersDetails, dispatch, apiCalled, setApiCalled, emailId])


  return (
    usersDetails.length > 0 &&
    <>{console.log(usersDetails)}
      {emailId && emailId.length > 0 && <Header OpenSidebar={OpenSidebar} />}
      <div className={emailId && emailId.length > 0 ? 'grid-container full-page' : ''}>
        {emailId && emailId.length > 0 && <SideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          user={currentUserDetails}
        />}
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>} ></Route>
          <Route path='/applyLoan' element={<LoanForm userData={currentUserDetails} ></LoanForm>}></Route>
          <Route path='loans' element={<LoanList></LoanList>}></Route>
          <Route path='/viewLoan/:id' element={<ViewLoan></ViewLoan>}></Route>
          <Route path="/login" Component={currentUserDetails && Object.keys(currentUserDetails).length === 0 && Loginpage}></Route>
          <Route path="/trackLoan/:id" Component={ApplicationTracker}></Route>
          <Route path="/loanStatistics" Component={LoanStatistics}></Route>
        </Routes>
      </div>
    </>
  );
}
export default App;