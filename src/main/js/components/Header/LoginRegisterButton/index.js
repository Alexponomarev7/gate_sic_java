import React from 'react';
import { Link } from 'react-router-dom'
import Item from "antd/es/list/Item";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

class LoginRegisterButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
            <Item onClick={this.props.handleLogout}
                  className={"btn btn-outline-primary my-2 my-sm-0"}>Выход</Item>
            )
        }
        return (
            <Link to={'/login'} className={"btn btn-outline-primary my-2 my-sm-0"}>Вход / регистрация</Link>
        );
    }
}

export default withRouter(LoginRegisterButton);