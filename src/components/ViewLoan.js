import axios from 'axios'
import '../styles/viewLoan.css'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DynamicDialog from '../components/DynamicDialog'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
export default function ViewLoan() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usersDetails = useSelector((state) => state.user.user);
    const loanDetails = useSelector((state) => state.loan.loan);
    const [currentUserDetails, setCurrentUserDetails] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);
    const [markCompleted, setMarkCompleted] = useState(false);
    const [buttonData, setButtonData] = useState([]);
    const [dialogTitle, setDialogTitle] = useState('')
    const { id } = useParams();
    const fileDatacolumns =
        [
            { field: 'name', headerName: 'File name', width: 80 },
            { field: 'size', headerName: 'File size', width: 80 }
        ]
    const [loanData, setloanData] = useState({});
    const loanBasicDetailTemplate = [
        { name: 'name', displayName: 'Applicant Name' },
        { name: 'dateOfBirth', displayName: 'Date of birth' },
        { name: 'gender', displayName: 'Gender' },
        { name: 'panId', displayName: 'PAN' },
        { name: 'email', displayName: 'Email' },
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
    useEffect(() => {
        const roleData = localStorage.getItem('role')
        if (roleData === 'CUSTOMER') {
            navigate('/')
        }
        const emailId = localStorage.getItem('emailId');
        // if (usersDetails.length === 0) {
        //     (async () => {
        //         await dispatch(getUserDetails());
        //         await dispatch(getLoanDetails());
        //     })()

        // } else {
        if (emailId && emailId.length > 0) {
            const dataVal = usersDetails.find(ele => ele.email === emailId);
            setCurrentUserDetails(dataVal)
            // const loanDataVal = 
            const loanDataIdVal = loanDetails.find((ele) => ele.id === parseInt(id));
            setloanData(loanDataIdVal);
            if (loanDetails.length > 0) {
                const loanCustomerData = usersDetails.find(ele => ele.name === loanDataIdVal.name);
                if (!Object.keys(loanCustomerData).includes('existingLoanId')) {
                    setMarkCompleted(true);
                }
            }

        }

    }, [id, dispatch, usersDetails, navigate, loanDetails, setMarkCompleted])
    const handleOpenDialog = (content) => {
        setDialogContent(content);
        setOpenDialog(true);
    };

    const handleCloseDialog = (dataFromDialog) => {
        console.log(dataFromDialog)
        setOpenDialog(false);
        setDialogContent(null);
        if (dataFromDialog.selectedOption.length > 0) {
            console.log(dataFromDialog)
            const patchParams = dataFromDialog.selectedButton === ('Assigned' || 'Reassigned') ? { loanOfficer: dataFromDialog.selectedOption, status: 'Underwriting' } : { comments: dataFromDialog.selectedOption, status: dataFromDialog.selectedButton, loanOfficer: loanData.loanOfficer !== '-' ? loanData.loanOfficer : currentUserDetails.name }
            axios.patch(`http://localhost:8080/loanDetails/${id}`, patchParams).then(res => {
                setloanData(res.data)
            }).catch(err => { console.log(err) })
        }
    };
    function formatFileSize(bytes) {
        if (bytes < 1024) {
            return bytes + ' B';
        } else if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        } else {
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
    }
    const loanCompletion = () => {
        const currentLoanApplicantDetail = usersDetails.find(ele => ele.name === loanData.name);
        const peopleDetailsUpdateData = { ...currentLoanApplicantDetail };
        delete peopleDetailsUpdateData[`existingLoanId`];
        axios.put(`http://localhost:8080/peopleDetails/${peopleDetailsUpdateData.id}`, peopleDetailsUpdateData).then(res => {
            setMarkCompleted(true)
        }).catch(err => {
            console.log(err);
        })

    }
    return (
        usersDetails.length > 0 && loanData && Object.keys(loanData).length > 0 && currentUserDetails && Object.keys(currentUserDetails).length > 0 && <div className='container'>{console.log(Object.keys(currentUserDetails))}
            <div className="row  mb-2">
                <div className='subform-title'>Basic Details</div>
                {loanBasicDetailTemplate.map((ele, ind) => (
                    <div className='col mb-1' key={ind}>
                        <div className='loan-detail-title mb-1'>{ele.displayName} </div>
                        <div className='val'>{loanData[ele.name]}</div>
                    </div>
                ))}
            </div><br></br>
            <div className="row mb-2">
                <div className='subform-title'>Loan Details</div>
                {loanDetailTemplate.map((ele, ind) => (
                    <div className='col' key={ind}>
                        <div className='loan-detail-title'>{ele.displayName} </div>
                        <div className='val'>{loanData[ele.name]}</div>
                    </div>
                ))}
            </div><br></br>
            <div className="row mb-2">
                <div className='subform-title'>Branch Details</div>
                {branchDetailsTemplate.map((ele, ind) => (
                    <div className='col' key={ind}>
                        <div className='loan-detail-title'>{ele.displayName} </div>
                        <div className='val'>{loanData[ele.name]}</div>
                    </div>
                ))}
            </div><br></br>
            <div className="row mb-2">
                <div className='subform-title'>File Details</div>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {fileDatacolumns.map((column, ind) => (
                                    <TableCell sx={{ color: '#000' }} className='loan-detail-title' key={ind}>{column.headerName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loanData[`uploadedFiles`].map((row, ind) => (
                                <TableRow key={ind}>
                                    {fileDatacolumns.map((column, indexVal) => (
                                        <TableCell sx={{ color: '#000' }} onClick={(eve) => { console.log('hi') }} key={indexVal}>
                                            {column.field === 'size' ? formatFileSize(row[column.field]) : row[column.field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="row">{console.log(loanData.status)}
                {(
                    (currentUserDetails.role === 'BANK_MANAGER' && currentUserDetails.branch === loanData.branch) || (currentUserDetails.role === 'LOAN_OFFICER' && currentUserDetails.name === loanData.loanOfficer)
                ) && (loanData.status !== 'Approved' && (loanData.status !== 'Rejected')) && <div className='col button-container'>
                        {(currentUserDetails.role === 'BANK_MANAGER' && currentUserDetails.branch === loanData.branch) && <button className='btn btn-primary button-placement' onClick={() => { handleOpenDialog('assignLoanDialog'); setButtonData([loanData[`loanOfficer`] === '-' ? 'Assign' : 'Reassign']); setDialogTitle('Assign loan') }}>
                            {loanData[`loanOfficer`] === '-' ? 'Assign' : 'Reassign'}
                        </button>}

                        <DynamicDialog
                            open={openDialog}
                            dialogTitle={dialogTitle}
                            onClose={handleCloseDialog}
                            dialogContent={dialogContent}
                            dialogProps={currentUserDetails?.branchMembers ? currentUserDetails?.branchMembers : []}
                            buttonData={buttonData}
                        />
                        {(loanData.status !== 'Approved' && (loanData.status !== 'Rejected')) && <button className='btn btn-primary button-placement' onClick={() => { handleOpenDialog('actionDialog'); setButtonData(['Reject', 'Approve']); setDialogTitle('Take action') }}>
                            Take action
                        </button>}

                    </div>}
                {(currentUserDetails.role === 'BANK_MANAGER' && currentUserDetails.branch === loanData.branch && (loanData.status === 'Approved' || loanData.status === 'Rejected') && !markCompleted) && <div className='col button-container'> <button className='btn btn-primary button-placement' onClick={loanCompletion}>
                    Mark Complete
                </button>
                </div>}
            </div>
        </div>
    )
}
