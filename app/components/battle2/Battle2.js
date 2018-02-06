import React from 'react';
import PropTypes from 'prop-types';
import PlayerInput from '../playerInput/PlayerInput';
import PlayerPreview from '../playerInput/PlayerPreview';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Battle2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(() => {
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });

        console.log('handleSubmit ' + username );
    }

    handleReset(id) {
        this.setState(() => {
            let newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }

    render() {

        let match = this.props.match;
        let playerOneName = this.state.playerOneName;
        let playerOneImage = this.state.playerOneImage;
        let playerTwoName = this.state.playerTwoName;
        let playerTwoImage = this.state.playerTwoImage;

        return (
           <Grid divided='vertically'>
               <Grid.Row columns={2}>

                {!playerOneName &&
                <Grid.Column>
                    <PlayerInput
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}/>
                </Grid.Column>
                }

                {playerOneImage !== null &&
                    <Grid.Column>
                        <PlayerPreview
                            avatar={this.state.playerOneImage}
                            id='playerOne'
                            username={this.state.playerOneName}
                            onReset={this.handleReset}/>
                    </Grid.Column>
                }

                {!playerTwoName &&
                    <Grid.Column>
                        <PlayerInput
                            onSubmit={this.handleSubmit}
                            label='Player Two'
                            id='playerTwo'/>
                </Grid.Column>
                }

                {playerTwoImage !== null &&
                    <Grid.Column>
                        <PlayerPreview
                            avatar={this.state.playerTwoImage}
                            username={playerTwoName}
                            id='playerTwo'
                            onReset={this.handleReset}/>
                    </Grid.Column>
                    }
               </Grid.Row>
               {playerOneImage && playerTwoImage &&
               <Button size='medium'>
                   <Link
                       to={{
                           pathname: match.url + '/results',
                           search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                       }}>
                       Battle
                   </Link>
               </Button>
               }
           </Grid>
        )
    }
}

export default Battle2;
