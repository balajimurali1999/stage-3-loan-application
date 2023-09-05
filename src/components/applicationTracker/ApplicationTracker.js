import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApplicationsByUserIdAsync, selectApplications } from './appTrackerSlice';
 import Stepper from './Stepper';

 
const RequestDetails = () => {
  console.log("Request Detail");
  return <h1>
    Request Details
  </h1>

}
const Payment = () => {
  console.log("Payment");
  return <h1>
    Payment
  </h1>

}
const Confirmation = () => {
  console.log("Confirmantion");
  return <h1>
    Confirmantion
  </h1>
}

function ApplicationTracker() {
  const dispatch = useDispatch();
  const applications = useSelector(selectApplications);

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Request details',
    'Payment',
    'Booking confirmation',
  ];

  const getSectionComponent = () => {
    switch (activeStep) {
      case 0: return <RequestDetails />;
      case 1: return <Payment />;
      case 2: return <Confirmation />;
      default: return null;
    }
  }

  useEffect(() => {
    dispatch(fetchApplicationsByUserIdAsync(1));
  }, [dispatch]);
 

  return (
    <Fragment>
      <div className='container '>
        <div className="row">
          <div className='progresses'>
            <h1>Application Tracker</h1>
          </div>
        </div>
        <div className="row align-items-start ">
          <div className='col'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Loan Type</th>
                  <th scope="col">Loan Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications && applications.map((application,ind) => {
                    return (
                      <tr key={ind}>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='row' style={{margin: "auto 10px"}}>
          <div className='col-3' style={{backgroundColor: "aliceblue", padding: "10px"}}>
            <Stepper steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
               />
          </div>
          <div className='col-9' style={{padding: "15px"}}>
            Content Here
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ApplicationTracker;