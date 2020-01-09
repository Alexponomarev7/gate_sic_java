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
import {connect} from 'react-redux';
import AdminApp from './../AdminApp';
import SubmissionAdmin from '../AdminApp/SubmissionAdmin'
import CompetitionAdmin from './../AdminApp/CompetitionsTable/CompetitionAdmin';

import { Layout, notification } from 'antd';
import 'antd/dist/antd.css';

import {getCurrentUser} from "./../../util/APIUtils";
import {ACCESS_TOKEN} from "./../../constants";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import userReducer from "../../reducers/user";

const { Content } = Layout;

class Main extends React.Component {
    constructor(props) {
        super(props);
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
        this.props.loginAuth();
        console.log("authing...")
        getCurrentUser()
            .then(response => {
                this.props.login(response)
            }).catch(error => {
                this.props.loginFail(error)
            });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogin() {

        this.props.history.push("/");

        this.loadCurrentUser();

        notification.success({
            message: 'Gate',
            description: 'Login succeed!'
        });
    }

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.props.history.push(redirectTo);

        this.props.logout();

        notification[notificationType]({
            message: 'Gate',
            description: description,
        });
    }

    render() {
        if(this.props.isLoading) {
            return <p>loading..</p>
        }

        // TODO check where state is changed internally (all ok except HEADER)
        //                     <Layout className="app-container">
        return (
            <Switch>
                <Route path='/admin'>
                    <Switch>
                        <Route exact path='/admin' component={AdminApp}/>
                        <Route path='/admin/competitions/:number' component={CompetitionAdmin}/>
                        <Route path='/admin/submissions/:number' component={SubmissionAdmin}/>
                    </Switch>
                </Route>

                <Route path='/'>
                    <Header handleLogin={this.handleLogin}
                            handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route exact path='/' component={Index}/>
                        <Route path='/competitions/:number' component={Competition}/>
                        <Route path='/competitions' component={Competitions}/>
                        <Route path="/login"
                               render={(props) => <Login handleLogin={this.handleLogin} {...props} />}/>
                        <Route path='/registration' render={(props) => <Registration {...props}/>}/>
                    </Switch>
                </Route>
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    const tmp = state.userReducer;

    return {
        error: tmp.error,
        isLoading: tmp.isLoading,
        isAuthenticated: tmp.isAuthenticated,
        currentUser: tmp.currentUser,
        loading: tmp.componentIsLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch({type: 'USER_AUTH', user}),
        loginFail: (err) => dispatch({type: 'USER_FAIL', err}),
        loginAuth: () => dispatch({type: 'USER_FETCHING'}),
        logout: () => dispatch({type:'USER_ANONYMOUS'}),
        loading: () => dispatch({type:'COMPONENT_LOADING'}),
        loaded: () => dispatch({type: 'COMPONENT_LOADED'})
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
