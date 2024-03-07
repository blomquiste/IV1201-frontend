import React from "react";
import { Link } from "react-router-dom";
import '../styling/application.css'

/**
 * Renders the view for the user to se his current appliction.
 * @param user user data.
 * @param competenceArray  array of commpetences
 * @param availabilityArray array of the availability.
 * @returns  div with user view
 */
export default function UserView({user, competenceArray, availabilityArray}){
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    function formatCompetence(compID){
        if(compID===1) return "Ticket sales";
        if(compID===2) return "Lotteries";
        if(compID===2) return "Roller coaster operation";
    }

    return (
        <div className={"mainContainer"}>
            <h2> {user.name}s application</h2>
            <div className={"applicationContainer"}>
                {competenceArray.length === 0 && availabilityArray.length === 0 ? (
                    <button><Link to={"/apply"}>Apply now</Link></button> ) : (
                <div className="textContainer">
                    <div className="competence-container">
                        <h3>Competence</h3>
                        {competenceArray.map((competence) => (
                            <div key={competence.competence_id}>
                                {formatCompetence(competence.competence_id)}
                            </div>
                        ))}
                    </div>
                    <div className="availability-container">
                        <h3>Availability</h3>
                        {availabilityArray.map((availability) => (
                            <div key={availability.availability_id}>
                                {formatDate(availability.from_date)} to {formatDate(availability.to_date)}
                            </div>
                        ))}
                    </div>
                    <button /*TODO*/>Edit application</button>
                </div>
                )}
            </div>
        </div>
    )
}