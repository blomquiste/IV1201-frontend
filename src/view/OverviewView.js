import '../styling/forms.css'
import React from "react";

/**
 * Renders applicant data fetched from OverviewPresenter
 * @param props
 * @returns {Element}
 * @constructor
 */
function OverviewView(props) {
    function sortHandlerACB(e) {props.onSort(e.target.value)}
    function renderSortACB(i) {return <option key={i} value={i}>{i}</option>}

    function renderApplicationsACB(applications) {
        let applicant = applications.row_to_json;
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
            <tr className={"userDataContainer"} key={applicant.person_id} onClick={detailHandlerACB}>
                <td>{applicant.name + " "} </td>
                <td>{applicant.surname + " "}</td>
                <td>{statusHandlerACB(applicant.status_id)}</td>
            </tr>
        )
    }

    return (
        <div>
            <h2>Applications</h2>
            <select onChange={sortHandlerACB}>
                <option value={props.sortOptions || ""}>Sort</option>
                {props.sortOptions.map(renderSortACB)}
            </select>
            {!props.applications? (<span>Loading applications</span>) : (
            <table>
                <thead>
                    <tr>
                        {props.sortOptions.map(option => <th key={option}>{option}</th>)}
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