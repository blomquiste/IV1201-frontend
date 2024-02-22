import {useFormik} from 'formik'
import '../styling/forms.css'
/**
 * 
 * @param {function} sendResetEmail function that calls the /sendRestoreMail api with the entered email address 
 * @returns 
 */
export default function SendRestoreUserdataEmailView(props){
  const formik = useFormik({
    // Manage form state
    initialValues: {
        email: '',
    },
    // Submit form data
    onSubmit: values => {
        props.sendResetEmail(values)
    },
    // Validate
    validate: values => {
        let errors = {}
        if(!values.email){errors.email = "Required"}else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Invalid email format";}
        return errors
    }})
  return <div>
    <div className={"mainContainer"}>
            <h3>If you already have an account from earlier put in your email and 
                a code will be sent allowing you to 
            </h3>
            {props.emailNotFound && <div>Email address was not found in user database 
                or username and password exists for that user or the email domain does not exist</div>}
            <div className={"inputContainer"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="inputGroup">
                        <label htmlFor={"email"}>Email</label>
                        <input type={"email"} id={"email"} name={"email"} onChange={formik.handleChange}
                               value={formik.values.email}/>
                        {formik.errors.email ?  <div className={"error-message"}>{formik.errors.email}</div> : null}
                    </div>
                <button type={"submit"}>Send email</button>
                </form>
            </div>
        </div>
  </div>
}