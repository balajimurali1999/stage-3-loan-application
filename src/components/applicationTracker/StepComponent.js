import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function StepComponent({ steps, LoanDetailStatus }) {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (LoanDetailStatus === 'Approved' || LoanDetailStatus === 'Rejected') {
      steps.pop();
      console.log(steps)
      steps.push({ label: LoanDetailStatus })

    }
    const numVal = steps.findIndex(ele => ele.label === LoanDetailStatus);
    setActiveStep(numVal)


  }, [steps, LoanDetailStatus])
  return (steps !== null && steps.length > 0 && LoanDetailStatus != null && LoanDetailStatus.length > 0 &&
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((step, index) => (
          <Step key={index}>

            {step.label === 'Rejected' && <StepLabel StepIconComponent={() => <CancelIcon style={{ color: '#FF0000' }} />}>{step.label}</StepLabel>
            }
            {step.label === 'Approved' && <StepLabel StepIconComponent={() => <CheckCircleIcon style={{ color: 'rgb(50,205,50' }} />}>{step.label}</StepLabel>
            }
            {(step.label !== 'Approved' && step.label !== 'Rejected') && <StepLabel >{step.label}</StepLabel>
            }
          </Step>
        ))}
      </Stepper>
      <Box mt={2}>
        <Typography variant="body1">{console.log(activeStep)}
          Current Status - {LoanDetailStatus}
        </Typography>
      </Box>
    </Paper>
  );
}

export default StepComponent;
