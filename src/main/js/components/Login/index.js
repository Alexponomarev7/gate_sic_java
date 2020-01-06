import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import Form from './../Form'
import {Link} from "react-router-dom";

const inputs = [{
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
    className: "btn"
}]

const props = {name: 'loginForm', method: 'POST', action: '/perform_login', inputs: inputs}

const params = new URLSearchParams(window.location.search)

class Login extends React.Component {
    render() {
        return (
            <div>
                <Form {...props} />
                <h4><Link to={"/registration"}>Зарегистрироваться</Link></h4>
            </div>
    );
    }
}

export default Login;