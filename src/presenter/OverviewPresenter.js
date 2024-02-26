import OverviewView from "../view/OverviewView";
import React, {useState} from "react";
import {fetchApplications} from "../integration/DBCaller";

export default function Overview(props) {
    const sortOptions = ["First name", "Surname", "Application status"]
    function sortApplications(variable) {
        //TODO sort according to variable
    }
    async function onApplication(person_id) {
        //TODO
    }

    return (
        <OverviewView
            applications={fetchApplications()}
            onApplication={onApplication()}
            sortOptions={sortOptions}
            onSort={sortApplications()}
        />
    )
}