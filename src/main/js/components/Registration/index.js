import React from 'react';
import ReactDOM from 'react-dom'
import Form from './../Form'

const inputs = [{
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
    className: "btn"
}]

const props = {name: 'registrationForm', method: 'POST', action: '/registration', inputs: inputs}

const params = new URLSearchParams(window.location.search)

class Registration extends React.Component {
    render() {
        return (
            <Form {...props} />
        );
    }
}

export default Registration;