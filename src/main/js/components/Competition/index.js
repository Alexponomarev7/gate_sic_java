import React from 'react';

import { loadProblemsFromContest } from './../../util/APIUtils'
import {connect} from "react-redux";
import SubmitUploader from "./SubmitUploader";


class TaskListElement extends React.Component {
    constructor(props) {
        super(props);
        this.uploadUrl = "/competitions/" +
            this.props.contestId + "/problem/" + this.props.task.id + "/submit";
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.task.id}</th>
                <td>{this.props.task.name}</td>
                <td> Here will be uploaders </td>
            </tr>
        );
    }
}


class TaskList extends React.Component {
    constructor(props) {
        super(props);
        self.tasks = [];
    }

    componentDidMount() {
        loadContest(this.props.contestId).then(response => {
            self.tasks = response.map(task => <TaskListElement task={task} contestId={this.props.contestId} />);
            this.forceUpdate();
        });
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Task name</th>
                    <th scope="col">Some actions</th>
                </tr>
                </thead>
                <tbody>
                {self.tasks}
                </tbody>
            </table>
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
                <div> <h5> Competition {this.props.match.params.number} </h5> </div>
                <TaskList contestId={this.props.match.params.number} />
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