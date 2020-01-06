import React, { Component } from 'react'




class Competitions extends React.Component {

    constructor(props){
        super(props);
        this.state = { username: '', data: null };
    }

    handleChange = event => {
        this.setState({ username: event.target.value });
    };

    handleSubmit = event => {
        fetch("/contests_get?username=" + this.state.username, {
            method: "GET",
            headers: new Headers({
            'Content-Type': 'application/json'
        })
        }).then(v => {
            this.state.data = v.body;
            console.log(v);
        }).catch(e => console.warn(e))
    }


    render() {
        if (!this.state.data) {
            return <form onSubmit={this.handleSubmit}>
                <label>
                    username:
                    <input onChange={this.handleChange} value={this.state.username}/>
                </label>
                <h2>data={this.state.data}</h2>
                <h2>aaa={this.state.username}</h2>
            </form>
        }
        return (
            <h2>{this.state.data}</h2>
        );
    }
}

export default Competitions;