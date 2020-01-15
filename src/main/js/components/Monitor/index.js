import React from 'react'
import {loadMonitorAutoGroup, loadMonitorHeader} from "../../util/APIUtils";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";


class MonitorElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.user}</th>
                {this.props.tasks}
            </tr>
        );
    }

}

class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.contestId = this.props.match.params.number;
        this.state = {
            tasks: [],
            rows: []
        }
    }

    componentDidMount() {
        loadMonitorHeader(this.contestId)
            .then(response => {
                this.setState({tasks: response.map(task => <th scope="col">{task.name}</th>)});
                loadMonitorAutoGroup(this.contestId)
                    .then(response => {
                        console.log(response);
                        this.setState({rows: response.map(row =>
                                <MonitorElement user={row.userData.userName} tasks={row.tasksScores.map(cell => cell.score)}/>)});
                        this.forceUpdate();
                    });
            });
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">User</th>
                    {this.state.tasks}
                </tr>
                </thead>
                <tbody>
                {this.state.rows}
                </tbody>
            </table>
        )
    }
}

export default withRouter(Monitor);
