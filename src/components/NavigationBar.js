import React from "react";
import '../styling/App.css';

/**
 * Navigation bar containing an option to sign out
 * @param user Access to users data
 */
export default function NavigationBar({ handleLogout }){
    return(
        <div className={"nav-bar"}>
            <a href="/user">My page</a>
            <a onClick={handleLogout} href="/">Sign Out</a>
        </div>
    )
}