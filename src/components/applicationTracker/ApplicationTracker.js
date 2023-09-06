import React, { useState, useEffect } from 'react';
import StepComponent from './StepComponent';
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails } from '../../redux/UserReducer';
import { getLoanDetails } from '../../redux/LoanListReducer';
function ApplicationTracker() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { label: 'Pending' },
    { label: 'Underwriting' },
    { label: 'Approval Process' },
  ];
  const loanDetailTemplate = [
    { name: 'loanAmount', displayName: 'Loan Amount' },
    { name: 'loanTenure', displayName: 'Loan Tenure' },
    { name: 'intrestRate', displayName: 'Intrest Rate' },
    { name: 'totalAmount', displayName: 'Total Amount' },
    { name: 'emiAmount', displayName: 'EMI amount' }
  ];
  const branchDetailsTemplate = [
    { name: 'branch', displayName: 'Branch' },
    { name: 'loanOfficer', displayName: 'Loan Officer', },
    { name: 'status', displayName: 'status' }]
  const [stepperData, setStepperData] = useState(steps);
  const usersDetails = useSelector((state) => state.user.user);
  const loanData = useSelector((state) => state.loan.loan);
  const [loanDetails, setLoanDetails] = useState({});
  const navigate = useNavigate();
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const roleData = localStorage.getItem('role')
    if (roleData !== 'CUSTOMER') {
      navigate('/')
    }
    const emailId = localStorage.getItem('emailId');

    if (usersDetails.length === 0) {
      dispatch(getUserDetails());
      dispatch(getLoanDetails());
    } else {
      const dataVal = usersDetails.find(ele => ele.email === emailId);
      const idVal = parseInt(id);
      setCurrentUserDetails(dataVal);
      const loandetailData = loanData.find(ele => ele.id === idVal);
      setLoanDetails(loandetailData);



    }
  }, [dispatch, id, loanData, navigate, usersDetails])
  return (
    <div>
      <div className='subform-title'>Application Tracker</div>
      {Object.keys(currentUserDetails).length > 0 && Object.keys(loanDetails).length > 0 && <StepComponent steps={stepperData} activeStep={activeStep} LoanDetailStatus={loanDetails.status} />}
      <div className="row mb-2">
        <div className='subform-title'>Loan Details</div>
        {loanDetailTemplate.map((ele, ind) => (
          <div className='col' key={ind}>
            <div className='loan-detail-title'>{ele.displayName} </div>
            <div className='val'>{loanDetails[ele.name]}</div>
          </div>
        ))}
      </div>
      <div className="row mb-2">
                <div className='subform-title'>Branch Details</div>
                {branchDetailsTemplate.map((ele, ind) => (
                    <div className='col' key={ind}>
                        <div className='loan-detail-title'>{ele.displayName} </div>
                        <div className='val'>{loanDetails[ele.name]}</div>
                    </div>
                ))}
            </div>
    </div>
  );
}

export default ApplicationTracker;
