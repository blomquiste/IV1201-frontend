import {useFormik} from "formik";
import React, {useState} from "react";

export default function AvailabilityView({props, handleAvailabilitySave}) {
    const [availabilityChoices, setAvailabilityChoices] = useState([]);
    //handleAvailabilitySave(values);

    const handleRemoveAvailability = (index) => {
        formik.resetForm();
        const updatedAvailabilityChoices = [...availabilityChoices];
        updatedAvailabilityChoices.splice(index, 1);
        setAvailabilityChoices(updatedAvailabilityChoices);
    };
    async function validateFormAndProceed(handleSave, availabilityChoices) {
        if (availabilityChoices.length!==0) {
            handleSave(availabilityChoices);
        } else {
            console.log("Form has validation errors. Cannot proceed.");
        }
    }

    const formik = useFormik({
        initialValues: {
            start: [],
            end: [],
        },
        onSubmit: async (values)=>{
            setAvailabilityChoices([...availabilityChoices, values]);
            formik.resetForm();
        },
        validate: values => {
            let errors = {}
            if(values.start.length===0){errors.start = "Required"}
            if(values.end.length===0){errors.end = "Required"}
            return errors;
        }
    })
    return (
        <div className={"mainContainer"}>
            <p>Please enter your availability period</p>
            <div className={"inputContainer"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"inputGroup"}>
                        <label htmlFor="start">Start date</label>
                        <input type={"date"}
                               name={"start"}
                               id={"start"}
                               placeholder={"Start date yy-mm-dd"}
                               onChange={formik.handleChange}/>
                        {formik.errors.start ? <div className={"error-message"}>{formik.errors.start}</div> : null}
                    </div>
                    <div className={"inputGroup"}>
                        <label htmlFor="end">End date</label>
                        <input type={"date"}
                               name={"end"}
                               id={"end"}
                               placeholder={"End date yy-mm-dd"}
                               onChange={formik.handleChange}/>
                        {formik.errors.end ? <div className={"error-message"}>{formik.errors.end}</div> : null}
                    </div>
                    <button type={"submit"}>Add</button>
                </form>
                <div className={"userDataContainer"}>
                    <h2>Your availabilities</h2>
                    <ul>
                        {/* Render all choices */}
                        {availabilityChoices.map((choice, index) => (
                            <li key={index}>
                                {choice.start} - {choice.end} <button className={"remove"} onClick={() => handleRemoveAvailability(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={()=>validateFormAndProceed(handleAvailabilitySave, availabilityChoices)}>Next</button>
            </div>
        </div>
    )
}