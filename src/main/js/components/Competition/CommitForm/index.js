import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {notification} from 'antd'

class Form extends Component {

    constructor(props) {
        super(props);

        if (props.error){
            this.state = { failure: 'wrong username or password!', errcount: 0 }
        }else{
            this.state = { errcount: 0 }
        }
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
            }).then(response => {
                this.props.onSuccess(response);
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

    renderError = () => {
        if(this.state.errcount || this.state.failure) {
            const errmsg = this.state.failure || Object.values(this.state.errmsgs).find(v=>v)
            console.log(`error: ${errmsg}`)
            return <div className="error">{errmsg}</div>
        }
    };

    render() {
        return (
            <div class="container">
                <form {...this.props} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}} >
                </form>
            </div>
        )
    }
}

export default Form;