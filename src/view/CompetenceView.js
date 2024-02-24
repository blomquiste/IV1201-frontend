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

    const formik = useFormik({
        initialValues: {
            expertise: [],
            yearsOfExperience: [],
        },
        onSubmit: async (values)=>{
            if (values.expertise && values.yearsOfExperience ){
                setCompetenceChoices([...competenceChoices, values]);
            }
            await formik.resetForm();
        },
        validate: values => {
            let errors = {}
            if(!values.expertise){errors.expertise = "Required"}
            if(!values.yearsOfExperience){errors.yearsOfExperience = "Required" }
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
                            value={Array.isArray(formik.values.expertise) ? formik.values.expertise[0] : formik.values.expertise}
                            onClick={fetchCompetenceAreas}>
                            <option value="" label="Select area of expertise"></option>
                            {/* Render a disabled option with loading message while competences are being fetched */}
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
                        <input  type={"number"}
                                id={"yearsOfExperience"}
                                name={"yearsOfExperience"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={Array.isArray(formik.values.yearsOfExperience) ? formik.values.yearsOfExperience[0] : formik.values.yearsOfExperience}
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
            <button onClick={() => {if(formik.isValid) { handleCompetenceSave(competenceChoices) }}
            }>Next</button>
        </div>
    )
}