import UserView from "../view/UserView";

/**
 * Full view of job applications that the user can see
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function User({user}) {

    return (
        <UserView user={user}/>
    )
}