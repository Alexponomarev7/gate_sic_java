import React from 'react'
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

class AdminApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello my friend!</div>
        )
    }
}

export default withRouter(AdminApp);