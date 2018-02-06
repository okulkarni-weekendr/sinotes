import React from 'react';
import queryString from 'querystring';
import api from '../../../utils/api';

class PlayerResults extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

        let players = queryString.parse(this.props.location.search.slice(1));
        console.log(players.playerOneName + ' ' + players.playerTwoName);
        let p1 = players.playerOneName;
        let p2 = players.playerTwoName;
        api.battle([p1, p2]).then((results) => {
            console.log(results);
        })
    }
    render() {
        return (
            <div>Results</div>
        );
    }
}

export default PlayerResults;
