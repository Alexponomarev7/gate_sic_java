import React from 'react';

class Competition extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Competition {this.props.match.params.number} </div>
        );
    }
}

export default Competition;