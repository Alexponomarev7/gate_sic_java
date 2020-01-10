import React from 'react';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

import {connect} from "react-redux";
import {loadProblem} from './../../../util/APIUtils'

// https://medium.com/@MatDrinksTea/rendering-markdown-and-latex-in-react-dec355e74119
// to render latex

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.contestId = this.props.match.params.contestId;
        this.taskId = this.props.match.params.taskId;
    }

    componentDidMount() {
        this.props.loading();
        loadProblem(this.taskId).then(response => {
            this.statement = response.statement;
            this.props.loaded();
        });
    }

    render() {
        return (
            <div className={'container'}>
                {this.statement}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Problem));