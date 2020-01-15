import React, { Component } from 'react'
import Form from './../Form'
import {notification} from 'antd'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class RegisterForm extends Form {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.props.error) {
            const data = new FormData(this.form);
            let object = {};
            data.forEach((value, key) => {object[key] = value});
            fetch("/api/auth/signup", {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(object)
            }).then(v => {
                if (v.ok) {
                    v.text().then(text => {
                        notification.success({
                            message: 'Gate',
                            description: text
                        });
                    });
                    this.props.history.push("/")
                } else {
                    v.json().then(json => {
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

export default withRouter(connect()(RegisterForm));