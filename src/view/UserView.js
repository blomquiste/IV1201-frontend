import React from "react";
import '../styling/forms.css'
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
            <h2>Your applications, {user.name}</h2>
            <div className="applications-container">
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
                            {formatDate(availability.from_date)} - {formatDate(availability.to_date)}
                        </div>
                    ))}
                </div>
            </div>
            <button /*TODO*/>Edit application</button>
        </div>


    )
}