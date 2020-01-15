import React from 'react'
import { loadContests } from './../../util/APIUtils'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import './index.css'

class CompetitionList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.competition.id}</th>
                <td>{this.props.competition.name}</td>
                <td><Link to={'/competitions/' + this.props.competition.id}
                          className={'btn btn-outline-primary my-2 my-sm-0'}>
                        Войти
                    </Link>
                </td>
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
        this.props.loading();

        loadContests().then(response => {
            self.competitions = response.map(competition => <CompetitionList competition={competition}/>);
            this.props.loaded();
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
                            <th scope="col">Enter</th>
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

function mapStateToProps(state) {
    const tmp = state.userReducer;

    return {
        error: tmp.error,
        isLoading: tmp.isLoading,
        isAuthenticated: tmp.isAuthenticated,
        currentUser: tmp.currentUser,
        loading: tmp.componentIsLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch({type: 'USER_AUTH', user}),
        loginFail: (err) => dispatch({type: 'USER_FAIL', err}),
        loginAuth: () => dispatch({type: 'USER_FETCHING'}),
        logout: () => dispatch({type:'USER_ANONYMOUS'}),
        loading: () => dispatch({type:'COMPONENT_LOADING'}),
        loaded: () => dispatch({type: 'COMPONENT_LOADED'})
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Competitions);