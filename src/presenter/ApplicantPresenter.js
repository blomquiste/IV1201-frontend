import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import UserInformationView from "../view/UserInformationView"
import CompetenceView from "../view/CompetenceView"
import AvailabilityView from "../view/AvailabilityView"
import SummaryView from "../view/SummaryView"
import {fetchTable, saveUpdatedData, setAvailability, setCompetence} from '../integration/DBCaller'

/**
 * The interface for an authenticated user with role_id 2. The user can submit an application from here
 * Data is persistent with sessionStorage
 * @param props
 */
export default function Applicant({ user, handleLogout }) {
    const [competenceObject, setCompetenceObject] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [activeComponent, setActiveComponent] = useState(1);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);
    useEffect(() => {
        const storedActiveComponent = sessionStorage.getItem('activeComponent');
        if (storedActiveComponent !== null && storedActiveComponent !== undefined) {
            setActiveComponent(JSON.parse(storedActiveComponent));
        } else {
            setActiveComponent(1);
        }
    }, []);

    const [formData, setFormData] = useState({
        competences: [],
        availabilities: []
    });
    useEffect(() => {
        const storedFormData = sessionStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
    }, []);

    /**
     * Controls what view is active. Uses sessionStorage for persistence
     */
    const showNext = () => {
        const storedActiveComponent = sessionStorage.getItem('activeComponent') || 1;
        if (storedActiveComponent) {
            const nextComponent = JSON.parse(storedActiveComponent) + 1;
            setActiveComponent(nextComponent);
            sessionStorage.setItem('activeComponent', JSON.stringify(nextComponent));
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
    /**
     * Stores the form data between views, also appends to existing array of data
     *
     * @param competenceData The areas of expertise and amount of experience input by the user
     */
    const handleCompetenceSave = (competenceData) => {
        setFormData(prevData => ({
            ...prevData,
            competences: [...prevData.competences, ...competenceData]
        }));
        const storedFormData = sessionStorage.getItem('formData');
        const existingFormData = storedFormData ? JSON.parse(storedFormData) : { competences: [], availabilities: [] };
        const updatedCompetences = {
            competences: [...existingFormData.competences, ...competenceData],
            availabilities: existingFormData.availabilities
        }
        sessionStorage.setItem('formData', JSON.stringify(updatedCompetences));
        showNext();
    };
    /**
     * @param availabilityData The availability periods input by the user
     */
    const handleAvailabilitySave = (availabilityData) =>{
        setFormData(prevData => ({
            ...prevData,
            availabilities: [...prevData.availabilities, ...availabilityData]
        }));
        const storedFormData = sessionStorage.getItem('formData');
        const existingFormData = storedFormData ? JSON.parse(storedFormData) : { competences: [], availabilities: [] };
        const updatedAvailabilities = {
            competences: existingFormData.competences,
            availabilities: [...existingFormData.availabilities, ...availabilityData]
        }
        sessionStorage.setItem('formData', JSON.stringify(updatedAvailabilities));
        showNext();
    }
    /**
     * Resets the form upon the users request
     */
    async function resetFormAndComponent(){
        setFormData({
            competences: [],
            availabilities: []
        });
        sessionStorage.removeItem('formData');
        setActiveComponent(1);
        sessionStorage.setItem('activeComponent', JSON.stringify(1));
    }
    /**
     * Sends the users application by calling 'saveApplicationData' in the DBCaller
     * @param data
     * @returns {Promise<void>}
     */
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
    }
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
    }

    return (<div>
        <NavigationBar user={user} handleLogout={handleLogout}/>
        {activeComponent===1 && <UserInformationView user={user} handleSave={updateData} showNext={showNext}/>}
        {activeComponent===2 && <CompetenceView competences={competenceObject} handleCompetenceSave={handleCompetenceSave} fetchCompetenceAreas={fetchCompetenceAreas} showNext={showNext}/>}
        {activeComponent===3 && <AvailabilityView handleAvailabilitySave={handleAvailabilitySave} showNext={showNext}/>}
        {activeComponent===4 && <SummaryView formData={formData} sendApplication={sendApplication} resetFormAndComponent={resetFormAndComponent} />}
    </div>);
}