import React, { Component } from 'react'
import Form from './../Form'

import {notification} from 'antd'
import 'antd/dist/antd.css';

import {ACCESS_TOKEN} from "../../constants";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

class LoginForm extends Form {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.props.error) {
            const data = new FormData(this.form);
            let object = {};
            data.forEach((value, key) => {object[key] = value});
            let json = JSON.stringify(object);
            fetch(this.form.action, {
                method: this.form.method,
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: json
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        localStorage.setItem(ACCESS_TOKEN, json.accessToken);
                        this.props.handleLogin();
                    });
                } else {
                    response.json().then(json => {
                        notification.error({
                            message: 'Gate',
                            description: json.message
                        });
                    });
                }
            }).catch(e => {
                notification.error({
                    message: 'Gate',
                    description: 'Something went wrong. Please try again.'
                });
                console.warn(e);
            });
        } else {
            console.log(this.props);
        }
    };

}

export default withRouter(LoginForm);