import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from './../Input'
import {notification} from 'antd'

class Form extends Component {

    constructor(props){
        super(props)
        if(props.error){
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

    renderError = () => {
        if(this.state.errcount || this.state.failure) {
            const errmsg = this.state.failure || Object.values(this.state.errmsgs).find(v=>v)
            console.log(`error: ${errmsg}`)
            return <div className="error">{errmsg}</div>
        }
    };

    render() {
        const inputs = this.props.inputs.map(
            ({name, placeholder, type, value, className}, index) => (
                <div className="input-group mb-3">
                    <Input key={index} name={name} placeholder={placeholder} type={type} value={value}
                       className={type==='submit'? className : 'form-control'} />
                </div>
            )
        )
        const errors = this.renderError()
        return (
            <div class="container">
                <form {...this.props} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}} >
                    {inputs}
                    {errors}
                </form>
            </div>
        )
    }
}

Form.propTypes = {
    name: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    inputs: PropTypes.array,
    error: PropTypes.string
}

export default Form;