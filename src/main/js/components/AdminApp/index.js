import React from 'react'
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import CompetitionsTable from "./CompetitionsTable";

class AdminApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CompetitionsTable />
            </div>
        )
    }
}

export default withRouter(AdminApp);