import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import React from "react";
/**
 * 
 * @returns server error message
 */
export default function ErrorView() {
  const navigate = useNavigate();
  return (<>
    <h2>Server error</h2>
    <div>Service unavailable, contact the site admin if problem persists</div>
    <button onClick={() => {navigate("/");}}>return to start site</button>
  </>)
}