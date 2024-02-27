import '../styling/forms.css'
import React, {useEffect, useState} from "react";
import getApplications from "../presenter/OverviewPresenter";

function OverviewView(props) {
    function sortHandlerACB(e) {props.onSort(e.target.value)}
    function renderSortACB(i) {return <option key={i} value={i}>{i}</option>}

    function renderApplicationsACB(applicant) {
        function detailHandlerACB(application, index) {
            props.onApplication(application.person_id)
            window.location.hash="#/details"
        }

        function statusHandlerACB(status) {
            if(status === 1) return "Unhandled";
            if(status === 2) return "Accepted";
            if(status === 3) return "Rejected";
        }
        return (
            <tr className={"userDataContainer"} key={applicant.row_to_json.person_id} onClick={detailHandlerACB}>
                <td>{applicant.row_to_json.name + " "} </td>
                <td>{applicant.row_to_json.surname + " "}</td>
                <td>{statusHandlerACB(applicant.row_to_json.status_id)}</td>
            </tr>
        )
    }

    return (
        <div onLoad={props.loadApplications}>
            <h2>Applications</h2>
            <select onChange={sortHandlerACB}>
                <option value={props.sortOptions || ""}>Sort</option>
                {props.sortOptions.map(renderSortACB)}
            </select>
            {!props.applications? (<span>Loading applications</span>) : (
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Application Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.applications.map(renderApplicationsACB)}
                    </tbody>
            </table>)}
        </div>
    )
}

export default OverviewView;