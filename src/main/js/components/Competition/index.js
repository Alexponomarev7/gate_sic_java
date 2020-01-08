import React from 'react';
import { loadProblemsFromContest } from './../../util/APIUtils'
import {connect} from "react-redux";

class Problem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.problem.name}
            </div>
        )
    }
}

class Competition extends React.Component {
    constructor(props) {
        super(props);
        this.problems = [];
    }

    componentDidMount() {
        this.props.loading();
        loadProblemsFromContest(this.props.match.params.number).then(
            response => {
                this.problems = response.map(problem =>
                    <form >
                        <Problem problem={problem} />
                    </form>
                );
                console.log(response);
                this.props.loaded();
            }
        )
    }

    render() {
        return (
            <div>
                <div>Competition {this.props.match.params.number} </div>
                {this.problems}
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

export default connect(mapStateToProps, mapDispatchToProps)(Competition);