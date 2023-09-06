import React, { useEffect, useState } from 'react'
import '../styles/loanStatistics.css'
import LoanList from './LoanList'
import ViewCell from './ViewCell';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../redux/UserReducer';
import { getLoanDetails } from '../redux/LoanListReducer';
export default function LoanStatistics() {
    const usersDetails = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [currentUserDetails, setCurrentUserDetails] = useState({});
    const dispatch = useDispatch();
    const loanDetails = useSelector((state) => state.loan.loan);
    const [overallLoanList, setOverallLoanList] = useState([]);
    const [approvedLoanList, setApprovedLoanList] = useState([]);
    const [rejectedLoanList, setRejectedLoanList] = useState([]);
    const [pendingLoanList, setPendingLoanList] = useState([]);

    const loanOfficerTableColumns = [{ field: 'id', headerName: 'Id', width: 160 },
    { field: 'status', headerName: 'status', width: 160 },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params) => <ViewCell params={params} label='View' />,
        width: 100,
    }];
    const managerTableColumns = [{ field: 'id', headerName: 'Id', width: 160 },
    { field: 'status', headerName: 'status', width: 160 },
    { field: 'loanOfficer', headerName: 'Loan Officer', width: 160 },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params) => <ViewCell params={params} label='View' />,
        width: 100,
    }];
    useEffect(() => {
        const roleData = localStorage.getItem('role')

        if (roleData === 'CUSTOMER') {
            navigate('/')
        }
        const emailId = localStorage.getItem('emailId');

        if (usersDetails.length === 0) {
            dispatch(getUserDetails());
            dispatch(getLoanDetails());
        } else {
            const dataVal = usersDetails.find(ele => ele.email === emailId);
            console.log(dataVal)
            setCurrentUserDetails(dataVal);
            if (roleData === 'BANK_MANAGER') {
                console.log(loanDetails)
                const rejectedData = loanDetails.filter(ele => ele.status === 'Rejected' && ele.branch === currentUserDetails.branch);
                const overallData = loanDetails.filter(ele => ele.branch === currentUserDetails.branch && ele.status === 'underwriting');
                const approvedData = loanDetails.filter(ele => ele.status === 'Approved' && ele.branch === currentUserDetails.branch);
                const pendingData = loanDetails.filter(ele => ele.status === 'Pending' && ele.branch === currentUserDetails.branch);
                setApprovedLoanList(approvedData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } }));
                setRejectedLoanList(rejectedData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } }));
                setOverallLoanList(overallData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } }));
                setPendingLoanList(pendingData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } }));
            } else if (roleData === 'LOAN_OFFICER') {
                const rejectedData = loanDetails.filter(ele => ele.status === 'Rejected' && ele.loanOfficer === currentUserDetails.name);
                const approvedData = loanDetails.filter(ele => ele.status === 'Approved' && ele.loanOfficer === currentUserDetails.name);
                setApprovedLoanList(approvedData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } }));
                setRejectedLoanList(rejectedData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } }));
            }

        }
    }, [navigate, loanDetails, usersDetails, dispatch, currentUserDetails])
    return (
        usersDetails.length > 0 &&

        <div className='container statistic-container'>
            <div className="subform-title">Loan Statistics</div>
            {currentUserDetails.role === 'BANK_MANAGER' && <> <div className="row data-table-container" >
                <div className="subform-title">Underwriten Loans</div>
                <LoanList columns={managerTableColumns} rowData={overallLoanList}></LoanList>
            </div>
                <div className="row data-table-container" >
                    <div className="subform-title">Pending Loans</div>
                    <LoanList columns={managerTableColumns} rowData={pendingLoanList}></LoanList>
                </div>

                <div className="row data-table-container">
                    <div className="subform-title">Approved Loans</div>

                    <LoanList columns={managerTableColumns} rowData={approvedLoanList}></LoanList>
                </div>
                <div className="row data-table-container">
                    <div className="subform-title">Rejected Loans</div>

                    <LoanList columns={managerTableColumns} rowData={rejectedLoanList}></LoanList>
                </div>
            </>}
            {
                currentUserDetails.role === 'LOAN_OFFICER' && <>
                    <div className="row data-table-container">
                        <div className="subform-title">Approved Loans</div>

                        <LoanList columns={loanOfficerTableColumns} rowData={approvedLoanList}></LoanList>
                    </div>
                    <div className="row data-table-container">
                        <div className="subform-title">Rejected Loans</div>

                        <LoanList columns={loanOfficerTableColumns} rowData={rejectedLoanList}></LoanList>
                    </div>
                </>
            }

        </div>
    )
}
