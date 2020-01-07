import React, { Component } from 'react'
import Form from './../Form'
import {notification} from 'antd'

class RegisterForm extends Form {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.state.errcount) {
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
            }).then(v => {
                if (v.ok) {
                    v.text().then(text => {
                        notification.success({
                            message: 'Gate',
                            description: text
                        });
                    });
                    // TODO: change screen (without redirect).
                } else {
                    v.json().then(json => {
                        notification.error({
                            message: 'Gate',
                            description: json.message
                        });
                    });
                }
                if(v.redirected) window.location = v.url
            }).catch(e => {
                notification.error({
                    message: 'Gate',
                    description: 'Something went wrong. Please try again.'
                });
                console.warn(e);
            });
        } else {
            console.log(this.state);
        }
    };

}

export default RegisterForm;