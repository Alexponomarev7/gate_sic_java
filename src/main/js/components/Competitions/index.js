import React from 'react'
import { loadContests } from './../../util/APIUtils'

class CompetitionList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.competition.id}</th>
                <td>{this.props.competition.name}</td>
            </tr>
        )
    }
}

class Competitions extends React.Component {
    constructor(props) {
        super(props);
        self.competitions = [];
    }

    componentDidMount() {
        loadContests().then(response => {
            self.competitions = response.map(competition => <CompetitionList competition={competition}/>);
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div className={'container'}>
                <div>About</div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Contest name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {self.competitions}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Competitions;