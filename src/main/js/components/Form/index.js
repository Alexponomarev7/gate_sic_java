import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from './../Input'
import {notification} from 'antd'


class Form extends Component {

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
                this.props.onSuccess(response);
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

    renderError = () => {
        if (!this.props.error) {
            return;
        }
        console.log(`error: ${this.props.error}`)
        return <div className="error">{this.props.error}</div>
    };

    render() {
        const inputs = this.props.inputs.map(
            ({name, placeholder, type, value, className}, index) => (
                <div className="input-group mb-3">
                    <Input key={index} name={name} placeholder={placeholder} type={type} value={value}
                       className={type==='submit'? className : 'form-control'} />
                </div>
            )
        );
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
};

export default Form;