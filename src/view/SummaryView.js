export default SummaryView;

function SummaryView({formData, sendApplication, showNext}) {
    console.log("to be submitted (SummaryView): ", formData)

    async function onSend(){
        try {
            await sendApplication(formData);
            console.log("Application sent successfully: ", formData);
        } catch (e){
            console.error(e);
        }
    }

    return (
        <div className={""}>
            <h2>Your selected competences</h2>
            <ul>
                {formData.competences.map((competence, index) => (
                    <p key={index}>
                        {competence.expertise}, {competence.yearOfExperience} experience
                    </p>
                ))}
            </ul>
            <h2>Your selected availabilities</h2>
            <ul>
                {formData.availabilities.map((availability, index) => (
                    <p key={index}>
                        {availability.start} - {availability.end}
                    </p>
                ))}
            </ul>
            <p>If everything looks in order, feel free to submit</p>
            <button type={"submit"} onClick={() => onSend}>Submit application</button><button className={"cancel"} onClick={showNext}>Cancel</button>
        </div>
    )
}