import React, { useState } from "react";
import {
    MdAccountBalance,
    // MdPendingActions,
    // MdAssignmentTurnedIn,
    MdGrading,
    MdAssignmentAdd,
    MdMonetizationOn,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const availableSidebarComponents = [
    {
        icon: <MdGrading className="icon" />,
        label: "Loan List Statistics",
        role: "LOAN_OFFICER",
        link: "/loans",
    },
    {
        icon: <MdGrading className="icon" />,
        label: "Loan List Statistics",
        role: "BANK_MANAGER",
        link: "/loans",
    },
    {
        icon: <MdAssignmentAdd className="icon" />,
        label: "Apply Loan",
        role: "CUSTOMER",
        link: "/applyLoan",
    },
    {
        icon: <MdMonetizationOn className="icon" />,
        label: "Track  loan",
        role: "CUSTOMER",
        link: "/trackLoan",
    }

];
function SideBar({ openSidebarToggle, OpenSidebar, user }) {
    const navigate = useNavigate();
    let filteredComponents = availableSidebarComponents.filter(
        (component) => component.role === user.role
    );
    if (user.role === 'CUSTOMER' && Object.keys(user).includes('isLoanTaken')) {
        filteredComponents = filteredComponents.filter(ele => ele.label !== 'Apply Loan');
    }
    return (
        <aside
            id="sidebar"
            className={openSidebarToggle ? "sidebar-responsive" : ""}
        >
            <div className="sidebar-title">
                <div className="sidebar-brand" onClick={() => navigate('/')}>
                    <MdAccountBalance className="icon_header" />
                    Loan App
                </div>
                <span className="icon close_icon" onClick={OpenSidebar}>
                    X
                </span>
            </div>
            <ul className="sidebar-list">
                {filteredComponents.map((component, index) => (
                    <li className="sidebar-list-item" key={index}>
                        <Link to={`${component.link}`}>
                            {component.icon} {component.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
export default SideBar;
