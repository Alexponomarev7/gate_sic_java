import CodeMirror from 'react-codemirror'
import React from 'react'

class Editor extends React.Component {
    constructor(props) {
        super(props)
    }
    // FIXME plz use redux...
    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }

    render() {
        let options = {
            lineNumbers: true,
        };
        return (
            <CodeMirror value={this.props.code} onChange={this.updateCode} options={options} />
            )
    }
}

export default Editor;

