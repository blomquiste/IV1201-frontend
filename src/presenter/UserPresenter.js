import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import UserView from "../view/UserView";
import {getCompetences, getAvailabilities, setAvailability} from "../integration/DBCaller";

/**
 * Full view of job applications that the user can see
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function User({user}) {
    const [competenceArray, setCompetenceArray] = useState([]);
    const [availabilityArray, setAvailabilityArray] = useState([]);
    useEffect(() => {
        fetchUserCompetences();
    }, []);
    useEffect(()=>{
        fetchUserAvailabilities();
    }, [])
    async function fetchUserCompetences() {
        const person_id= user.person_id;
        try {
            const response = await getCompetences(person_id);
            setCompetenceArray(response);
        } catch(e){
            console.error(e);
        }
    }
    async function fetchUserAvailabilities(){
        const person_id= user.person_id;
        try {
            const response = await getAvailabilities(person_id);
            setAvailabilityArray(response);
        }catch (e) {
            console.error(e);
        }
    }

    return (<div>
        <NavigationBar/>
        <UserView user={user} competenceArray={competenceArray} availabilityArray={availabilityArray}/>
    </div>
    )
}