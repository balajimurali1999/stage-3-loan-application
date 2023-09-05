import React from 'react'

function Stepper({ steps, activeStep, setActiveStep }) {
    const ApplicationStatusList = [
        { PENDING: "PENDING" },
        { UNDERWRITING: "UNDERWRITING" },
        { APPROVED: "APPROVED" },
        { REJECTED: "REJECTED" }
    ]
    console.log(steps, activeStep, setActiveStep);
    return (
        <div style={{ display: "flex", flexDirection: 'column', flexWrap: "wrap", justifyContent: "center", alignContent: "center" }}>
            {ApplicationStatusList.map((status, ind) => {
                console.log(status,);
                return <div key={ind} className='steps-container' onClick={() => setActiveStep(activeStep + 1)}>
                    <div className="steps step-active">
                        <span><i className="fa fa-check"></i></span>
                    </div>
                    <span className="line line-active"></span>
                </div>
            })
            }
            <div className='steps-container'>
                <div className="steps step-active">
                    <span><i className="fa fa-check"></i></span>
                </div>
                <span className="line line-active"></span>
            </div>
            <div className='steps-container'>
                <div className="steps step-inactive">
                    <span><i className="fa fa-check"></i></span>
                </div>
                <span className="line line-inactive"></span>
            </div>
            <div className='steps-container'>
                <div className="steps step-inactive">
                    <span className="font-weight-bold">3</span>
                </div>
            </div>
        </div>
    )
}

export default Stepper