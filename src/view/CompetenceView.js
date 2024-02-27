import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {useFormik, Field} from 'formik'
import '../styling/forms.css'
import '../styling/application.css'

export default function CompetenceView({ fetchCompetenceAreas, competences, handleCompetenceSave, showNext }) {
    const [competenceChoices, setCompetenceChoices] = useState([]);

    const handleRemoveCompetence = (index) => {
        formik.resetForm();
        const updatedCompetenceChoices = [...competenceChoices];
        updatedCompetenceChoices.splice(index, 1);
        setCompetenceChoices(updatedCompetenceChoices);
    };

    async function validateFormAndProceed(handleSave, competenceChoices) {
        if (competenceChoices.length!==0) {
            handleSave(competenceChoices);
        } else {
            console.log("Form has validation errors. Cannot proceed.");
        }
    }

    const formik = useFormik({
        initialValues: {
            expertise: [],
            yearsOfExperience: [],
        },
        onSubmit: async (values) => {
            const err = await formik.validateForm();
            if (Object.keys(err).length === 0) {
                const exists = competenceChoices.some(choice => choice.expertise === values.expertise);
                if (!exists) {
                    setCompetenceChoices([...competenceChoices, values]);
                    await formik.resetForm();
                } else {
                    console.log("This competence already exists in the list.");
                }
            } else {
                console.log("Form has validation errors. Cannot submit.");
            }
        },
        validate: values => {
            let errors = {}
            if (values.expertise.length === 0) {
                errors.expertise = "Required"
            }
            if (values.yearsOfExperience.length === 0) {
                errors.yearsOfExperience = "Required"
            }
            return errors
        }
    })

    return (<div className={"mainContainer"}>
            <h2>Please enter your field of expertise and your experience in the field.</h2>
            <div className={"inputContainer"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"inputGroup"}>
                        <label htmlFor={"expertise"}>Area of expertise</label>
                        <select
                            id={"expertise"}
                            name={"expertise"}
                            onChange={formik.handleChange}
                            value={formik.values.expertise}
                            onClick={fetchCompetenceAreas}>
                            <option value="" label="Select area of expertise"></option>
                            {!competences ? (
                                <option disabled>Loading competences...</option>) : (
                                <>
                                    {/* Render options from the competences state */}
                                    {competences.map((competence) => (
                                        <option key={competence.name}
                                                value={competence.id}>
                                            {competence.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                        {formik.errors.expertise ?
                            <div className={"error-message"}>{formik.errors.expertise}</div> : null}
                    </div>
                    <div className={"inputGroup"}>
                        <label htmlFor={"yearsOfExperience"}>Experience within the field</label>
                        <input type={"number"}
                               id={"yearsOfExperience"}
                               name={"yearsOfExperience"}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.yearsOfExperience}
                               placeholder={"months"}>
                        </input>
                        {formik.errors.yearsOfExperience ?
                            <div className={"error-message"}>{formik.errors.yearsOfExperience}</div> : null}
                    </div>
                    <button type={"submit"} className={"add"}>Add</button>
                </form>
                <div className={"userDataContainer"}>
                    <h2>Your competences</h2>
                    <ul>
                        {/* Render all choices */}
                        {competenceChoices.map((choice, index) => (
                            <li key={index}>
                                {choice.expertise}, {choice.yearsOfExperience} months <button className={"remove"}
                                                                                              onClick={() => handleRemoveCompetence(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button onClick={()=>validateFormAndProceed(handleCompetenceSave, competenceChoices)}>Next</button>
        </div>
    )
}