import React from 'react'
import Form from './../../../Form'

import {notification} from 'antd'
import 'antd/dist/antd.css';

import {createContest} from "../../../../util/APIUtils"
import CompetitionListElement from './../CompetitionListElement'

import {ACCESS_TOKEN} from "../../../../constants";
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import {connect} from "react-redux";

class CompetitionForm extends Form {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.props.error) {
            const data = new FormData(this.form);
            let object = {};
            data.forEach((value, key) => {object[key] = value});
            createContest(JSON.stringify(object)).then(competition => {
                this.props.setCompetitions(
                    <CompetitionListElement competition={competition}/>
                    );
                notification.success({
                    message: 'Gate',
                    description: 'Contest created!'
                });
            }).catch(e => {
                notification.error({
                    message: 'Gate',
                    description: 'Something went wrong. Please try again.'
                });
                console.warn(e);
            });
        } else {
            console.log(this.props);
        }
    };

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

export default withRouter(connect(mapToStateProps, mapDispatchToProps)(CompetitionForm));