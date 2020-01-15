import React from 'react';
import ReactDOM from 'react-dom'
import RegisterForm from './../RegisterForm'
import {Link} from "react-router-dom"
import {notification} from "antd";
import './index.css'

const props = {
    inputs: [{
        name: "username",
        placeholder: "username",
        type: "text"
    },{
        name: "password",
        placeholder: "password",
        type: "password"
    },
        {
            name: "confirmPassword",
            placeholder: "confirmPassword",
            type: "password"
        },{
            type: "submit",
            value: "Submit",
            className: "btn btn-outline-success"
        }]
};

const params = new URLSearchParams(window.location.search)

class Registration extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="registrationForm">
                <RegisterForm {...props} />
            </div>
        );
    }
}

export default Registration;