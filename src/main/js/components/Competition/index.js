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

class Competition extends React.Component {
    constructor(props) {
        super(props);
        this.tasks = [];
        this.contestId = this.props.match.params.number;
    }

    componentDidMount() {
        this.props.loading();
        loadProblemsFromContest(this.contestId).then(response => {
            self.tasks = response.map(task => <TaskListElement task={task} contestId={this.contestId} />);
            this.props.loaded();
        });
    }

    render() {
        return (
            <div class='container'>
                <div>
                    <h5> Competition {this.contestId} </h5>
                </div>
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