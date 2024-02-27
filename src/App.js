import './styling/App.css';
import Login from "./presenter/LoginPresenter"
import Registration from "./presenter/RegistrationPresenter";
import MissingUserDataUpdate from "./presenter/UpdateMissingUserDataPresenter";
import Applicant from "./presenter/ApplicantPresenter"
import User from "./presenter/UserPresenter"
import Error from "./view/ErrorView";

import {
    Authenticate,
    saveRegistrationData,
    restoreAccountByEmail,
    setCompetence,
    setAvailability, logout,
} from './integration/DBCaller'
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";

/** Express-based auth server that uses JWT tokens to authenticate users
 * npm i cors bcrypt jsonwebtoken lowdb
 * 
 * Renders all the site presenters and ErrorView
 * Saves loggedIn state in sessionStorage for persistance;
 * When the application refreshes, check if the user information exists in sessionStorage
 * 
 @returns LoginPresenter - handles logic for login and calls the relevant views
 * RegistrationPresenter - handles logic for registration and calls the relevant views.
 * ErrorView - shows simple error message on server error during api calls.
 */
function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userObject, setUserObject] = useState({});
    const[failedLogin, setFailedLogin] = useState(false);

    const[error, setError] = useState(false);
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
    // Check sessionStorage on page load
    const user = sessionStorage.getItem('user');
    if (user) {
        setLoggedIn(true);
        setUserObject(JSON.parse(user));
        }
    }, []);

  /**
   * Function that calls the backend api and sets the result as the user state 
   * and sets loggedIn boolean state to true in LoginPresenter on a successful api call.
   * Also handles errors in failed api calls.
   * @async
   * @param {Object} user takes argument on the form of: {username: 'username', password:'pw'}
   * 
   */
  async function handleLogin(user){
    const response = await Authenticate(user);
    try{
      if(response === 404)
        setFailedLogin(true)
      else if(response === 500){
        throw new Error("500 http code from server")
      }
      else{
        console.error(response)
        setFailedLogin(false)
        setUserObject(response)
        setLoggedIn(true)
        sessionStorage.setItem('user', JSON.stringify(response));
      }
    }catch(e){
      console.error(`error in callDB: ${e}`)
      setError(true)
    }
  }

    /**
     * Sign out functionality
     * Calls the DBCaller function logout()
     */
    async function handleLogout() {
        try {
            sessionStorage.removeItem('user');
            setLoggedIn(false);
            setUserObject(null);
            await logout();
        } catch (e) {
            console.error('Error during logout:', e);
        }
    }

    /**
     * Function that calls the backend api,
     * sets 'registered' boolean state to true on a successful api call.
     * @param fieldValues The values provided by the user trying to register as an object
     */
    async function handleRegistration(fieldValues) {
        try {
            const response = await saveRegistrationData(fieldValues);
            if (response) {
                console.log('User registered successfully');
                setRegistered(true);
            } else {
                console.error('Registration failed:', response.statusText);
                setRegistered(false);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setRegistered(false);
        }
    }
    /**
     *
     * @param email
     * @returns {Promise<void>}
     */
  async function updateUserData(email){
    console.log("jsoning email", JSON.stringify(email))
    restoreAccountByEmail(email)
  }
/*
    async function sendApplication(data){
        try {
            const { competences, availabilities } = data;
            console.log(competences);
            console.log(availabilities);
            await sendCompetence(competences);
            await sendAvailability(availabilities);
            setApplicationSubmitted(true);
            console.log("Application sent successfully");
        } catch (error) {
            console.error("Error submitting application:", error);
            setApplicationSubmitted(false);
        }
    }*/
    /*
    async function sendCompetence(data){
        console.log(data);
        try {
            await Promise.all(data.map(setCompetence));
            console.log("Competences sent successfully");
        } catch (e) {
            console.error("Error sending competences:", e);
        }
    }

  async function sendAvailability(data){
        console.log(data);
        try {
            await Promise.all(data.map(setAvailability));
            console.log("Availabilities sent successfully");
        }catch(e){
            console.error("Error sending availabilities:", e);
        }
  }*/

  return (<div className={"App"}>
        <Router>
            <Routes>
                <Route path="/" element={!error && <Login
                       handleLogin = {handleLogin}
                       failedLogin = {failedLogin}
                       user = {userObject}
                       loggedIn={loggedIn}/>}/>
                <Route path="/register" element={!error && <Registration
                       handleRegistration={handleRegistration}
                       registered={registered}/>}/>
                <Route path="/updateUser" element = {!error && <MissingUserDataUpdate 
                       updateUserData = {updateUserData}/>}/>
                <Route path="/register" element={!error && <Registration/>}/>
                <Route path="/apply" element={loggedIn ? <Applicant
                       handleLogout={handleLogout}
                       user = {userObject} /> : <Error/>} />
                <Route path="/user" element={loggedIn ? <User
                       user = {userObject}
                       handleLogout={handleLogout}/> : <Error/>} />
                <Route path="/error" element={error && <Error/>}  />
            </Routes>
        </Router>
      <div>{error && <Error/>}</div>
    </div>)
}
export default App;