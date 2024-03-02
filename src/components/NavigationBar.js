import React from "react";
import '../styling/App.css';
import {logout} from '../integration/DBCaller.js'
import {useNavigate} from "react-router-dom";

/**
 * Navigation bar containing an option to sign out
 * @param user Access to users data
 */
export default function NavigationBar(){
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Logged out successfully");
            navigate("/")
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    return(
        <div className={"nav-bar"}>
            <ul>
                <li><a href="/user">My page</a></li>
                <li><a href="">News</a></li>
                <li><a href="">About</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    )
}