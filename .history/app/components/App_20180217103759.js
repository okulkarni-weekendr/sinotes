import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './home/Home';
import Chart from './charts/Charts';
import MyNav from './navbar/NavBar';
import Tree from "./D3IndentedTree/Tree";
import Notes from './Notes/notes';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            activeItem: ''
        };
    }

    render() {
        const { activeItem } = this.state;
        return (
            <BrowserRouter>

                <Grid centered>
                    <Grid.Column width={10}>
                        <Grid.Row stretched>
                            <MyNav />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/tree' component={Tree} />
                                <Route exact path='/notes' component={Notes} />
                                <Route render={() => {
                                    return <p>Not Found</p>
                                }} />
                            </Switch>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>

            </BrowserRouter>
        );
    }
}

export default App;
