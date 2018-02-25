import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

class Home extends React.Component {
    render() {
        return (
            <Grid divided='vertically'>
                <Grid.Row>
                    <Grid.Column>
                        <h4>Github Battle: Battle of languages, for Devs, of Devs</h4>
                        <Link className='button btn btn-primary' to='/battle2'>
                            Battle
                    </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Home;

