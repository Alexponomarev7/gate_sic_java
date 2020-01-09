import React from 'react'
import {loadAdminContests} from "../../../util/APIUtils";
import {Link} from "react-router-dom";

class CompetitionListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.competition.id}</th>
                <td>{this.props.competition.name}</td>
                <td><Link to={'/admin/competitions/' + this.props.competition.id}
                          className={'btn btn-outline-primary my-2 my-sm-0'}>
                    Войти
                </Link>
                </td>
            </tr>
        );
    }

}

class CompetitionsTable extends React.Component {
    constructor(props) {
        super(props);
        self.competitions = [];
    }

    componentDidMount() {
        loadAdminContests().then(response => {
            self.competitions = response.map(competition => <CompetitionListElement competition={competition}/>);
            this.forceUpdate();
        });
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Contest name</th>
                    <th scope="col">Enter</th>
                </tr>
                </thead>
                <tbody>
                {self.competitions}
                </tbody>
            </table>
        )
    }
}

export default CompetitionsTable;
