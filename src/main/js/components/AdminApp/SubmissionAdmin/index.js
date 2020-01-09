import React from 'react'
import {loadSubmission} from './../../../util/APIUtils'
//import CodeMirror from 'codemirror'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import './index.css'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');

class SubmissionAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.submissionId = this.props.match.params.number;
        this.text = '';
    }

    componentDidMount() {
        loadSubmission(this.submissionId).then(response => {
            this.text = response.contents;
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div class='container'>
                <CodeMirror
                    value={this.text.toString()}
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

export default SubmissionAdmin;