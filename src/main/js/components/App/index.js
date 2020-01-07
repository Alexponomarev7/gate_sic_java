import React from 'react'
import ReactDOM from 'react-dom'

const client = require('./../../client');
const bootstrap = require('bootstrap')

import Header from './../Header'
import NotFound from './../NotFound'
import Competitions from './../Competitions'
import Login from './../Login'
import Registration from "./../Registration";
import Index from "./../Index"
import Competition from "./../Competition";

import { Layout, notification } from 'antd';
import {getCurrentUser} from "./../../util/APIUtils";
import {ACCESS_TOKEN} from "./../../constants";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

const { Content } = Layout;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        this.handleLogout = this.handleLogout.bind(this);
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
            isLoading: true,
            isAuthenticated: true,
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
            message: 'Gate',
            description: 'Login succeed!!!!'
        });

        this.props.history.push("/");

        this.loadCurrentUser();
    }

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.props.history.push(redirectTo);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        notification[notificationType]({
            message: 'Polling App',
            description: description,
        });
    }

    render() {
        if(this.state.isLoading) {
            return <p>loading..</p>
        }

        return (
            <Layout className="app-container">
                <Header isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        handleLogin={this.handleLogin}
                        handleLogout={this.handleLogout}/>
                <Switch>
                    <Route exact path='/' component={Index}/>
                    <Route path='/competitions/:number' component={Competition}/>
                    <Route path='/competitions' component={Competitions}/>
                    <Route path="/login"
                           render={(props) => <Login handleLogin={this.handleLogin} {...props} />}/>
                    <Route path='/registration' component={Registration}/>
                </Switch>
            </Layout>
        );
    }
}

export default withRouter(Main);
