import React from "react";
import '../styling/App.css';

/**
 * Pop-up message confirming a successfully sent application
 * @param user Access to users data
 */
export default function Success({ handleLogout }){
    return(
        <div className={"success-message"}>
            Your application was sent successfully!
        </div>
    )
}