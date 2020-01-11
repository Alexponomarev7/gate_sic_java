import React from 'react';
import { Link } from 'react-router-dom'
import Item from "antd/es/list/Item";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import {connect} from "react-redux";
import {ACCESS_TOKEN} from "../../../constants";
import {notification} from "antd";

class LoginRegisterButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
            <a onClick={() => {
                this.props.logout();
                localStorage.removeItem(ACCESS_TOKEN);
                this.props.history.push("/");
                notification.success({
                    message: 'Gate',
                    description: "You've been successfully logged out.",
                });
            }}
                  className={"btn btn-outline-primary my-2 my-sm-0"}>Выход</a>
            )
        }
        return (
            <Link to={'/login'} className={"btn btn-outline-primary my-2 my-sm-0"}>Вход / регистрация</Link>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginRegisterButton));