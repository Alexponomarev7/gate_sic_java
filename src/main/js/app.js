import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

const client = require('./client');
const bootstrap = require('bootstrap')

import Header from './components/Header'
import NotFound from './components/NotFound'
import Competitions from './components/Competitions'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/users'}).done(response => {
            this.setState({users: response.entity._embedded.users});
        });
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

class UserList extends React.Component{
    render() {
        const users = this.props.users.map(user =>
            <User key={user._links.self.href} user={user}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Id</th>
                </tr>
                {users}
                </tbody>
            </table>
        )
    }
}

class User extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.user.name}</td>
            </tr>
        )
    }
}

const Main = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/competitions' component={Competitions}/>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
    <Main />,
    document.getElementById('react')
)