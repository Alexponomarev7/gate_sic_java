import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import LoginForm from './../LoginForm'
import {Link} from "react-router-dom";
import {notification} from "antd";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

const props = {
    inputs: [{
        name: "username",
        placeholder: "username",
        type: "text"
    },{
        name: "password",
        placeholder: "password",
        type: "password"
    },{
        type: "submit",
        value: "Submit",
        className: "btn btn-outline-success",
        id: "LoginBtn"
    }]
};

const params = new URLSearchParams(window.location.search)

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="LoginForm">
                <LoginForm  {...props}/>
                <h4><Link to={"/registration"}>Зарегистрироваться</Link></h4>
            </div>
    );
    }
}

export default withRouter(Login);