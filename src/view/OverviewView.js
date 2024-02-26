import '../styling/forms.css'

function OverviewView(props) {

    function sortHandlerACB(e) {props.onSort(e.target.value)}
    function renderSortACB(opt, i) {return <option key={i} value={opt}>{opt}</option>}

    function renderApplicationsACB(application, index) {
        console.log(application)
        function detailHandlerACB() {
            props.onApplication(application.person_id)
            window.location.hash="#/details"
        }
        return (
            <span key={index} onClick={detailHandlerACB}>
                {props.application.name}
                {props.application.surname}
                {props.application.status}
            </span>
        )
    }

    return (
        <div>
            <select onChange={sortHandlerACB}>
                <option value={props.sortOptions || ""}>Sort</option>
                {props.sortOptions.map(renderSortACB)}
            </select>,
            {console.log(props.applications)}
            {props.applications.map(renderApplicationsACB)}
        </div>
    )
}

export default OverviewView;