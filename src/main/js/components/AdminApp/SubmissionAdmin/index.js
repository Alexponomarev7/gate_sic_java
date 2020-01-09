import React from 'react'
import {loadSubmission} from './../../../util/APIUtils'

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
            {this.text}
            </div>
        )
    }
}

export default SubmissionAdmin;