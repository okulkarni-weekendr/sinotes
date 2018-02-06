import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

function PlayerPreview(props) {

    const extra = (
        <a>
            <Icon name='user' />
            16 friends
        </a>
    );

    return (

        <div className='card' style={{width: 18 + 'rem'}}>
            <img
                className='card-img-top'
                src={props.avatar}
                alt={'Avatar for ' + props.username} />
            <div className='card-body'>
                    {props.id === 'playerOne'
                        ? <h5 className='card-title'>{'Challenger: ' + props.username} </h5>
                        : <h5 className='card-title'>{'Defender: ' + props.username}</h5>}
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button type='button' className="btn btn-outline-primary" onClick={props.onReset.bind(null, props.id)}>Reset</button>
            </div>
        </div>
    );
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
};

export default PlayerPreview;
