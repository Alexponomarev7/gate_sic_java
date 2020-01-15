import React from 'react'
import ReactDOM from 'react-dom'

const client = require('./../../client');
const bootstrap = require('bootstrap')

import Header from './../Header'
import Monitor from './../Monitor'
import NotFound from './../NotFound'
import Competitions from './../Competitions'
import Login from './../Login'
import Registration from "./../Registration";
import Index from "./../Index"
import Competition from "./../Competition";
import Problem from "./../Competition/Problem"
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
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    componentDidMount() {
        this.props.loginAuth();
        getCurrentUser()
            .then(response => {
                this.props.login(response);
            }).catch(error => {
            console.warn(error);
            this.props.loginFail(error)
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
                    <li>
                        <button onClick={() => this.props.history.goBack()}>Назад</button>
                    </li>
                    <Switch>
                        <Route exact path='/admin' component={AdminApp}/>
                        <Route path='/admin/competitions/:number' component={CompetitionAdmin}/>
                        <Route path='/admin/submissions/:number' component={SubmissionAdmin}/>
                    </Switch>
                </Route>

                <Route path='/'>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Index}/>
                        <Route path='/competitions/:number/monitor' component={Monitor}/>
                        <Route path='/competitions/:contestId/tasks/:taskId' component={Problem}/>
                        <Route path='/competitions/:number' component={Competition}/>
                        <Route path='/competitions' component={Competitions}/>
                        <Route path="/login" component={Login}/>
                        <Route path='/registration' component={Registration}/>
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
        login: (user) => dispatch({type: 'USER_AUTH', payload: user}),
        loginFail: (err) => dispatch({type: 'USER_FAIL', payload: err}),
        loginAuth: () => dispatch({type: 'USER_FETCHING'}),
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
