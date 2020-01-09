import React from 'react'
import {loadSubmission} from './../../../util/APIUtils'
//import CodeMirror from 'codemirror'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import './index.css'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');

import {setSubmissionStatus} from "../../../util/APIUtils";

import {connect} from 'react-redux';
import {notification} from "antd";

const inputs = [{
    name: "resolution",
    placeholder: "resolution",
    type: "text"
},{
    type: "okay",
    value: "OK",
    className: "btn"
},{
    type: "reject",
    value: "RJ",
    className: "btn"
}];


class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
    }

    sendStatus(status) {
        const json = JSON.stringify({
            id: this.props.curSub.id || "0",
            resolution: this.props.curRes,
            status: status
        })
        setSubmissionStatus(json).then(responce => {
            loadSubmission(this.props.curSub.id).then(this.props.setSub);
            notification.success({
                message: "Resolution",
                description: "Resolution is set"})
        }).catch(reason =>
            notification.error({
                message: "Resolution",
                description: "Something went wrong"
            }))
    }

    render() {
        let curRes = 'not found'
        if (this.props.curSub) {
            curRes = this.props.curSub.status || "NA"
        }


        return <div>
            Current resolution is {curRes}
            <input type="text" name="Resolution" onChange={(event) => this.props.setRes(event.target.value)}/>
            <button onClick={() => this.sendStatus("OK")}>OK</button>
            <button onClick={() => this.sendStatus("RJ")}>RJ</button>
        </div>
    }
}


class SubmissionAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.submissionId = this.props.match.params.number;
    }

    componentDidMount() {
        loadSubmission(this.submissionId).then(response => {
            this.props.setSub(response);
        });
    }

    render() {
        return (
            <div class='container'>
                <CodeMirror
                    value={this.props.curSub ? this.props.curSub.contents : "no code found"}
                    options={{
                        mode: 'python',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    onChange={(editor, data, value) => {
                    }}
                />
                <ReviewForm {...this.props} />
            </div>
        )
    }
}

function mapToStateProps(state) {
    const {adminReducer} = state;
    return {
        curSub: adminReducer.curSub,
        curRes: adminReducer.curRes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSub: (data) => dispatch({type: 'ADD_SUBMISSION', payload: data}),
        setRes: (resolution) => dispatch({type: 'ADD_RESOLUTION', payload: resolution})
    }
}


export default connect(mapToStateProps, mapDispatchToProps)(SubmissionAdmin);