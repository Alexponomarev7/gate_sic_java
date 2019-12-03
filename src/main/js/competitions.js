'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const bootstrap = require('bootstrap')

import Header from './components/Header'

class Competitions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {competitions: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/competitions'}).done(response => {
            this.setState({competitions: response.entity._embedded.competitions});
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <CompetitionList competitions={this.state.competitions}/>
            </div>
        )
    }
}

class CompetitionList extends React.Component{
    render() {
        const competitions = this.props.competitions.map(competition =>
            <Competition key={competition._links.self.href} competition={competition}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Id</th>
                </tr>
                {competitions}
                </tbody>
            </table>
        )
    }
}

class Competition extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.competition.name}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)

