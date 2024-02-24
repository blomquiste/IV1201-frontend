import '../styling/forms.css'
import React, { useState } from 'react';

function OverviewView(props) {
    //Login check

    //Sort functionality

    //Clickable applications -> show current application

    function renderApplicationsACB() {

    }

    return (
        <div>{props.applications.map(renderApplicationsACB)}</div>,
    <div>

        //Rendering all applications, showing:
        //  Full name
            //  Status (accepted | rejected | unhandled)
        </div>
    )
}

export default OverviewView;