import React from 'react';
import {loadContest} from "../../util/APIUtils";
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

export default Competition;