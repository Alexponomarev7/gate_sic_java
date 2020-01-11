import React, { Component } from 'react'
import Form from './../Form'

import {notification} from 'antd'
import 'antd/dist/antd.css';

import {getCurrentUser, login} from "../../util/APIUtils"

import {ACCESS_TOKEN} from "../../constants";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import {connect} from "react-redux";

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
            login(JSON.stringify(object)).then(json => {
                localStorage.setItem(ACCESS_TOKEN, json.accessToken);
                this.props.loginAuth();
                getCurrentUser().then(this.props.login).catch(this.props.loginFail)
                this.props.history.push("/");
                notification.success({
                    message: 'Gate',
                    description: 'Login succeed!'
                });
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

function mapStateToProps(state) {
    const tmp = state.userReducer;

    return {
        isLoading: tmp.isLoading,
        isAuthenticated: tmp.isAuthenticated,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch({type: 'USER_AUTH', payload: user}),
        loginFail: (err) => dispatch({type: 'USER_FAIL', payload: err}),
        loginAuth: () => dispatch({type: 'USER_FETCHING'}),
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));