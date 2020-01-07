import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

const client = require('./../../client');
const bootstrap = require('bootstrap')

import Header from './../Header'
import NotFound from './../NotFound'
import Competitions from './../Competitions'
import Login from './../Login'
import Registration from "./../Registration";

import { Layout, notification } from 'antd';
import {getCurrentUser} from "./../../util/APIUtils";
import {ACCESS_TOKEN} from "./../../constants";
import withRouter from "react-router/withRouter";
const { Content } = Layout;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/users'}).done(response => {
            this.setState({users: response.entity._embedded.users});
        });
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

class UserList extends React.Component{
    render() {
        const users = this.props.users.map(user =>
            <User key={user._links.self.href} user={user}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Pass</th>
                </tr>
                {users}
                </tbody>
            </table>
        )
    }
}

class User extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.password}</td>
            </tr>
        )
    }
}

export default Index;