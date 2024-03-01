import {Link} from 'react-router-dom';
import React from "react";
/**
 * 
 * @returns server error message
 */
export default function ErrorView() {
  return (<>
    <div>server error</div>
    <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
    <p>Add username and password to an existing account? <Link to={"/updateUser"}>Click here</Link></p>
  </>)
}