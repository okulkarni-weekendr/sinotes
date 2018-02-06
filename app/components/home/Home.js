import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <h4>Github Battle: Battle of languages, for Devs, of Devs</h4>
                <Link className='button btn btn-primary' to='/battle2'>
                    Battle
                </Link>
            </div>
        )
    }
}

export default Home;

