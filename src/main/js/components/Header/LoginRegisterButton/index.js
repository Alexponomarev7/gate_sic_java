import React from 'react';
import { Link } from 'react-router-dom'

class LoginRegisterButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isAuthenticated) {
            return (<a>"Hi, "</a>)
        }
        return (
            <Link to={'/login'} className={"btn btn-outline-primary my-2 my-sm-0"}>Вход / регистрация</Link>
        );
    }
}

export default LoginRegisterButton;