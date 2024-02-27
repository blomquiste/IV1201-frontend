import UserInformationView from "../view/UserInformationView"
import ExperienceView from "../view/ExperienceView"
import AvailabilityView from "../view/AvailabilityView"
import SummaryView from "../view/SummaryView"
function ApplyformPresenter(props) {

    return ((
        <UserInformationView/>,
        <ExperienceView/>,
        <AvailabilityView/>)
        || //if above is submitted
        <SummaryView/>
    )
}