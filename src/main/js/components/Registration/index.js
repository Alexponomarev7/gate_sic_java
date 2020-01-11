import React from 'react';
import ReactDOM from 'react-dom'
import RegisterForm from './../RegisterForm'
import {notification} from "antd";

// let onSuccess = (response) => {
//     if (response.ok) {
//         response.text().then(text => {
//             notification.success({
//                 message: 'Gate',
//                 description: text
//             });
//         });
//         // TODO: change screen (without redirect).
//     } else {
//         response.json().then(json => {
//             notification.error({
//                 message: 'Gate',
//                 description: json.message
//             });
//         });
//     }
//     if (response.redirected) window.location = response.url;
// };

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
            className: "btn"
        }]
};

const params = new URLSearchParams(window.location.search)

class Registration extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <RegisterForm {...props } />
            </div>
        );
    }
}

export default Registration;