import React from 'react';

import {Link, withRouter} from 'react-router-dom';
import {loadAdminContestSubmissions} from "../../../../util/APIUtils";
import {connect} from 'react-redux';


class SubmissionElementAdmin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.submission.id}</th>
                <td>{this.props.submission.problem.name}</td>
                <td>{this.props.submission.user.username}</td>
                <td>{Date(this.props.submission.sendTS)}</td>
                <td>{this.props.submission.lang}</td>
                <td>
                    <Link to={'/admin/submissions/' + this.props.submission.id}
                       className={'btn btn-outline-primary my-2 my-sm-0'}>
                        Просмотреть
                    </Link>
                </td>
            </tr>
        );
    }
}

class CompetitionAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.contestId = this.props.match.params.number;
    }

    getSubmissions() {
        loadAdminContestSubmissions(this.contestId).then(response => {
            if (response.length === 0) {
                return;
            }
            console.log(response);
            this.props.setSubmissions(response.map(submission =>
                <SubmissionElementAdmin submission={submission} contestId={this.contestId} />));
        });
    }

    render() {
        if (!this.props.submissions) {
            this.getSubmissions();
        }
        return (
            <div class='container'>
                <div>
                    <h5> Competition {this.contestId} </h5>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Task</th>
                        <th scope="col">User</th>
                        <th scope="col">Time</th>
                        <th scope="col">Language</th>
                        <th scope="col">Some actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.submissions || "no submissions found"}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapToStateProps(state) {
    const {adminReducer} = state;
    return {
        submissions: adminReducer.submissions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSubmissions: (responce) => dispatch({type: 'ADD_SUBMISSIONS', payload: responce})
    }
}

export default withRouter(connect(mapToStateProps, mapDispatchToProps)(CompetitionAdmin));
