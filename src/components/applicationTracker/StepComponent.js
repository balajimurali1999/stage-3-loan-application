import React, { useEffect,useState } from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Paper, StepContent } from '@mui/material';

function StepComponent({ steps, LoanDetailStatus }) {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const numVal = steps.findIndex(ele => ele.label === LoanDetailStatus);
    if(numVal === -1) {
      setActiveStep(3)
    }
    else {
      setActiveStep(numVal)
    }
  }, [])
  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={2}>
        <Typography variant="body1">{console.log(activeStep)}
          Current Step: {activeStep + 1} - {LoanDetailStatus}
        </Typography>
      </Box>
    </Paper>
  );
}

export default StepComponent;
