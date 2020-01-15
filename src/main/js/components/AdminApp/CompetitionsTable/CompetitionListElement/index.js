import React from 'react'
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

class CompetitionListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.competition.id}</th>
                <td>{this.props.competition.name}</td>
                <td><Link to={'/admin/competitions/' + this.props.competition.id}
                          className={'btn btn-outline-primary my-2 my-sm-0'}>
                    Войти
                </Link>

                </td>
            </tr>
        );
    }

}

export default connect()(CompetitionListElement);
