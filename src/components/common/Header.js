import React from "react";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsJustify } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { getUserDetails } from "../../redux/UserReducer";
function Header({ OpenSidebar }) {
    const dispatch = useDispatch();
    let emailId = localStorage.getItem('emailId');
    const [userName, setUserName] = useState(null);
    const usersDetails = useSelector((state) => state.user.user);
    useEffect
        (() => {
            if (typeof usersDetails === 'object' && Object.keys(usersDetails).length === 0) {
                dispatch(getUserDetails());
            } else {
                if (emailId && emailId.length > 0 && usersDetails) {console.log(emailId)
                    const userNameData = usersDetails.find(ele => ele.email === emailId);
                    setUserName(userNameData.name);
                }
            }
        }, [usersDetails, dispatch, emailId]);
    return (
      
        <header className="header">
            <div className="menu-icon">
                <BsJustify className="icon" onClick={OpenSidebar} />
            </div>
            <div className="header-left">Hello {userName}!</div>
            <div className="header-right">
                <a href="/" title="logout" style={{textDecoration:"none"}}>
                    <FaSignOutAlt onClick={() => localStorage.clear()} className="icon" /> Logout
                </a>
            </div>
        </header>
    );
}
export default Header;