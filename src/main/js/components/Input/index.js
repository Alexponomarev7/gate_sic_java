import React, { Component } from 'react'
import PropTypes from 'prop-types'

// FIXME unused
class Input extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: props.value? props.value : '',
            className: props.className? props.className : '',
            error: false
        }
    }

    inputChange = (event) => {
        const value = event.target.value, name = event.target.name
        //switch(name) {
        //  case 'username': this.validate(name, value, /^([a-zA-Z0-9.]{4,})$/, 'invalid username')
        //    break;
        //  case 'password': this.validate(name, value, /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/, 'insecure password')
        //    break;
        //  default:
        //    console.warn(`unknown field ${name}`)
        //}
        this.setState({ value: value })
    }

    validate = (name, value, validRegex, warnmsg) => {
        const invalid = !value || !validRegex.test(value)
        if(!this.props.error && invalid) {
            this.setState({ className: 'input-error', error: true })
            this.handleError(name, warnmsg)
        }else if(this.props.error && !invalid) {
            this.setState({ className: '', error: false })
            this.handleError(name)
        }
    }

    render (){
        const {handleError, ...opts} = this.props
        this.handleError = handleError
        return (
            <input {...opts} value={this.props.value} onChange={this.inputChange} className={this.props.className} />
        )
    }
}

Input.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    handleError: PropTypes.func,
    value: PropTypes.string
}

export default Input
