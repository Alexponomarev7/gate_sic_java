import React from 'react'
import {loadAdminContests} from "../../../util/APIUtils";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';


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
    }

    getContests() {
        loadAdminContests()
            .then((responce) => {
                if (responce.length === 0) {
                    // to forbid infinite recursion (state changed, reloaded, state changed...)
                    return
                }
                this.props.setCompetitions(responce
                    .map(competition => <CompetitionListElement competition={competition}/>))
            })
    }

    render() {
        if (!this.props.competitions) {
            this.getContests();
        }
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
                {this.props.competitions || "competitions not found"}
                </tbody>
            </table>
        )
    }
}

function mapToStateProps(state) {
    const {adminReducer} = state;
    return {
        competitions: adminReducer.competitions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCompetitions: (responce) => dispatch({type: 'ADD_COMPETITIONS', payload: responce})
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(CompetitionsTable);
