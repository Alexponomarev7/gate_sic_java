import React from 'react';
import { Link } from 'react-router-dom'

class LoginRegisterButton extends React.Component {
    render() {
        return (
            <button type="button" className="btn btn-outline-primary my-2 my-sm-0">Вход / регистрация</button>
        );
    }
}

export default LoginRegisterButton;