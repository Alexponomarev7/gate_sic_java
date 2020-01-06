import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

const client = require('./client');
const bootstrap = require('bootstrap')

import Header from './components/Header'
import NotFound from './components/NotFound'
import Competitions from './components/Competitions'
import Login from './components/Login'
import Registration from "./components/Registration";

import { Layout, notification } from 'antd';
import {getCurrentUser} from "./util/APIUtils";
const { Content } = Layout;

class App extends React.Component {
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

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        //this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogin() {
        notification.success({
            message: 'Polling App',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {
        if(this.state.isLoading) {
            return <p>loading..</p>
        }

        return (
            <BrowserRouter>
                <Header isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={App}/>
                    <Route path='/competitions' component={Competitions}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('react')
)