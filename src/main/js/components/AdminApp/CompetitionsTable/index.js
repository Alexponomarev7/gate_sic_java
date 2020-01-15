import React from 'react'
import {loadAdminContests} from "../../../util/APIUtils";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import CompetitionForm from './CompetitionForm'
import CompetitionListElement from './CompetitionListElement'

const props = {
    inputs: [{
        name: "name",
        placeholder: "contest name",
        type: "text"
    },
    {
        type: "submit",
        value: "Create new contest",
        className: "btn btn-outline-success",
        id: "SubmitBtn"
    }]
};

class CompetitionsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        loadAdminContests()
            .then((response) => {
                this.props.setCompetitions(response
                    .map(competition => <CompetitionListElement competition={competition}/>))
            })
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
                {this.props.competitions || "competitions not found"}
                </tbody>
                <CompetitionForm {...props}/>
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
        setCompetitions: (response) => dispatch({type: 'ADD_COMPETITIONS', payload: response})
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(CompetitionsTable);
