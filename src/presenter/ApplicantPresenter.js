import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import UserCardView from "../view/UserCardView"
import CompetenceView from "../view/CompetenceView"
import AvailabilityView from "../view/AvailabilityView"
import SummaryView from "../view/SummaryView"
import {fetchTable, saveUpdatedData} from '../integration/DBCaller'


/**
 * The interface for an authenticated user.
 * The user can submit an application from here
 * @param props
 * @returns {*|JSX.Element}
 * @constructor
 */
export default function Applicant({ user, sendApplication }) {
    const [competenceObject, setCompetenceObject] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [activeComponent, setActiveComponent] = useState(1);
    const [formData, setFormData] = useState({
        //user: {},
        competences: [],
        availabilities: []
    });
    const showNext = () => {
        console.log("Show next clicked");
        if (activeComponent !== 4) {
            setActiveComponent((prevActiveComponent) => prevActiveComponent + 1);
        } else {
            setActiveComponent(1); // Set activeComponent to 1 if on the SummaryView
        }
    };
    async function updateData(data){
        try {
            const response = await saveUpdatedData(data);
            console.log("App.js, saved data: ", response);
            if (response) {
                console.log("User info updated successfully ", response);
                setUpdated(true);
            }
        }catch (e){
            console.error("Error saving user information: ", e);
        }
    }
    /**
     * Fetching rows from table competence in db,
     */
    async function fetchCompetenceAreas() {
        if(!competenceObject){
            try {
                const response = await fetchTable();
                await setCompetenceObject(response);
            } catch(e){
                console.error(e);
            }}
    }
    const handleCompetenceSave = (competenceData) => {
        setFormData(prevData => ({
            ...prevData,
            competences: [...prevData.competences, ...competenceData]
        }));
        showNext();
    };
    const handleAvailabilitySave = (availabilityData) =>{
        setFormData(prevData => ({
            ...prevData,
            availabilities: [...prevData.availabilities, ...availabilityData]
        }));
        showNext();
    }

    return (<div>
        <NavigationBar user={user}/>
        {activeComponent===1 && <UserCardView user={user} handleSave={updateData} showNext={showNext}/>}
        {activeComponent===2 && <CompetenceView competences={competenceObject} handleCompetenceSave={handleCompetenceSave} fetchCompetenceAreas={fetchCompetenceAreas} showNext={showNext}/>}
        {activeComponent===3 && <AvailabilityView handleAvailabilitySave={handleAvailabilitySave} showNext={showNext}/>}
        {activeComponent===4 && <SummaryView formData={formData} sendApplication={sendApplication} showNext={showNext} />}
    </div>);
}