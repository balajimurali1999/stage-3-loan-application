import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from "../redux/UserReducer";
import axios from 'axios';
import '../styles/dashboard.css'
import LoanList from './LoanList';
import { Link } from 'react-router-dom';
import ViewCell from './ViewCell';
export default function Dashboard() {

    const dispatch = useDispatch();
    const usersDetails = useSelector((state) => state.user.user);
    const [currentUserDetails, setCurrentUserDetails] = useState({});
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

    const userDetailDisplayTemplate = [
        { name: 'name', displayName: 'Username' },
        { name: 'email', displayName: 'Email' },
        { name: 'role', displayName: 'Role' },
        { name: 'branch', displayName: 'Branch' }

    ];
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
    const customerTableColumns = [{ field: 'id', headerName: 'Id', width: 160 },
    { field: 'status', headerName: 'status', width: 160 },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params) => <ViewCell params={params} label='Track' />,
        width: 100,
    }];
    const loanOfficerTableColumns = [{ field: 'id', headerName: 'Id', width: 160 },
    { field: 'status', headerName: 'status', width: 160 },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params) => <ViewCell params={params} label='View' />,
        width: 100,
    }];

    useEffect(() => {
        const emailId = localStorage.getItem('emailId');
        if (!emailId) {
            navigate('/login');
        }

        if (usersDetails.length === 0) {
            dispatch(getUserDetails());
        } else {
            if (emailId && emailId.length > 0) {
                const dataVal = usersDetails.find(ele => ele.email === emailId);
                setCurrentUserDetails(dataVal);
                (async () => {
                    await axios.get('http://localhost:8080/loanDetails').then((res) => {

                        if (res.data.length > 0 && currentUserDetails.role === 'BANK_MANAGER') {
                            const branchData = res.data.filter(ele => ele.branch === currentUserDetails.branch);
                            const rowData = branchData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } })
                            setRowData(rowData)
                        } else if (res.data.length > 0 && currentUserDetails.role === 'LOAN_OFFICER') {
                            const rowVal = res.data.filter(ele => ele.loanOfficer === currentUserDetails.name);
                            console.log(rowVal);
                            const rowData = rowVal.map(ele => { return { id: ele.id, name: ele.name, status: ele.status } })
                            setRowData(rowData)
                        } else if (res.data.length > 0) {
                            const rowVal = res.data.filter(ele => ele.name === currentUserDetails.name);
                            const rowData = rowVal.map(ele => { return { id: ele.id, name: ele.name, status: ele.status } })
                            setRowData(rowData)

                        }

                    }).catch(err => {
                        console.log(err)
                    })
                }
                )();

            }
        }

    }, [currentUserDetails, dispatch, usersDetails, navigate]);
    return (
        <div className='dashboard-container'>
            <div className="row container subform-title">Dashboard</div>
            <br></br>
            <div className='content-row container' >
                <div className="col" >
                    <div className="subform-title">User Details</div>
                    <div className="container">
                        {userDetailDisplayTemplate.map((ele, ind) => (
                            <div key={ind} className="row array-data form-label">{ele.displayName} :  {currentUserDetails[ele.name]}</div>
                        ))

                        }
                        {currentUserDetails.branchMembers &&
                            <>
                                <div className=" subform-title">Branch Members</div>
                                {currentUserDetails.branchMembers.map((ele, ind) => (
                                    <div key={ele}>
                                        <div className="row form-label">Name : {ele.name}</div>
                                        <div className="row form-label">Email : {ele.email}</div>
                                    </div>
                                ))}
                            </>
                        }

                    </div>
                </div>
                <div className="col  data-table-container"   >
                    {currentUserDetails.role === 'BANK_MANAGER' &&
                        <>
                            <div className=" subform-title">Pending  Loans</div> <br></br>
                            <LoanList columns={managerTableColumns} rowData={rowData} />
                        </>
                    }
                    {currentUserDetails.role === 'CUSTOMER' &&
                        <>
                            <div className=" subform-title">Loans Taken</div> <br></br>
                            <LoanList columns={customerTableColumns} rowData={rowData} />
                        </>
                    }
                    {currentUserDetails.role === 'LOAN_OFFICER' &&
                        <>
                            <div className=" subform-title">Loans Assigned</div> <br></br>
                            <LoanList columns={loanOfficerTableColumns} rowData={rowData} />
                        </>
                    }


                </div>
            </div>
        </div >
    )
}
