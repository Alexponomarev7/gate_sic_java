import React from 'react'
import {loadSubmission} from './../../../util/APIUtils'
//import CodeMirror from 'codemirror'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import './index.css'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');

import {connect} from 'react-redux';


class SubmissionAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.submissionId = this.props.match.params.number;
    }

    componentDidMount() {
        loadSubmission(this.submissionId).then(response => {
            this.props.setText(response.contents);
        });
    }

    render() {
        return (
            <div class='container'>
                <CodeMirror
                    value={this.props.text || "no code found"}
                    options={{
                        mode: 'python',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    onChange={(editor, data, value) => {
                    }}
                />
            </div>
        )
    }
}

function mapToStateProps(state) {
    const {adminReducer} = state;
    return {
        text: adminReducer.text,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setText: (text) => dispatch({type: 'ADD_SUBTEXT', payload: text})
    }
}


export default connect(mapToStateProps, mapDispatchToProps)(SubmissionAdmin);