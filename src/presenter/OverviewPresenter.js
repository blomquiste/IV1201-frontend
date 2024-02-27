import OverviewView from "../view/OverviewView";
import React, {useEffect, useState} from "react";
import {fetchApplications} from "../integration/DBCaller";

export default function Overview(props) {
    const sortOptions = ["First name", "Surname", "Application status"]
    const [applicationsObject, setApplicationsObject] = useState(null);
    async function getApplications() {
        if(!applicationsObject) {
            try {
                const response = await fetchApplications();
                await setApplicationsObject(response);
                console.log("presenter:", response)
            } catch(e) {
                console.log('Error in presenter fetching data')
            }
        }
    }
    function sortApplications(variable) {
        //TODO sort according to variable
    }
    async function onApplication(person_id) {
        //TODO
    }

    return (
        <OverviewView
            loadApplications={getApplications()}
            applications={applicationsObject}
            onApplication={onApplication()}
            sortOptions={sortOptions}
            onSort={sortApplications()}
        />
    )
}