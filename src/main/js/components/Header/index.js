import React from 'react';
import { Link } from 'react-router-dom'
import LoginRegisterButton from './LoginRegisterButton'
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

import './index.css'
import {connect} from "react-redux";
import {isAdmin} from "../../util/APIUtils";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let form = null;
        if (isAdmin(this.props.currentUser)) {
            form =
                <li className="nav-item active">
                    <Link to={'/admin'} className={"nav-link"}>Проверка посылок</Link>
                </li>
        }
        return (
            <div className="navbar-container">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link to={'/'} className={'navbar-brand'}>Gate</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Новости<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/competitions'} className={"nav-link"}>Соревнования</Link>
                        </li>
                        {form}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item active">
                            <button className="nav-link" onClick={() => this.props.history.goBack()}>Назад</button>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0 mr-1" type="submit">Search</button>
                    </form>
                    <LoginRegisterButton />
                </div>
            </nav>
            </div>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));