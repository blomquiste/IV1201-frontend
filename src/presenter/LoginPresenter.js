import React, { useState} from "react";
import LoginView from "../view/LoginView";
import FailedLoginView from "../view/FailedLoginView"
import User from "./UserPresenter";
import NavigationBar from "../components/NavigationBar"
import Overview from "./OverviewPresenter";

/**
 * Handles logic for login-related views
 * @param {Object} params
 * @param {boolean} props.loggedIn - true if user is logged in
 * @param {boolean} props.failedLogin - true if the user has tried to log in and failed
 * @param {function} props.callDB - login function that calls the backend api to login user
 * @returns LoginView - view that shows the login page
 * FailedLoginView - shows the LoginView with added error message about failed login
 * UserView - landing page after succesful login
 */
export default function Login(props) {
    return (<>
            <div>{!props.loggedIn && !props.failedLogin && <LoginView onLogin={props.handleLogin}/>}</div>
            <div>{props.loggedIn && !props.recruiter && <User user={props.user}/>}</div>
            <div>{props.loggedIn && props.recruiter && <Overview/>}</div>

            <div>{props.failedLogin && <FailedLoginView onLogin={props.handleLogin}/>}</div>
        </>
    )
}