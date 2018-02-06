import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Input, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeItem: 'home'
        };

        this.handleItemClick = this.handleItemClick.bind(this);
    }


    handleItemClick(e, {name}) {
        this.setState({
            activeItem: name
        })
    }

    render() {
        const { activeItem } = this.state;
        return (
            <Menu pointing secondary>
                <NavLink exact activeClassName='active' to='/'>
                    <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                </NavLink>
                <NavLink activeClassName='active' to='/popular'>
                    <Menu.Item name='Popular' active={activeItem === 'Popular'} onClick={this.handleItemClick} />
                </NavLink>
                <NavLink activeClassName='active' to='/charts'>
                    <Menu.Item name='Charts' active={activeItem === 'Charts'} onClick={this.handleItemClick} />
                </NavLink>
                <NavLink activeClassName='active' to='/battle2'>
                    <Menu.Item name='Battle' active={activeItem === 'Battle'} onClick={this.handleItemClick} />
                </NavLink>
                <NavLink activeClassName='active' to='/tree'>
                    <Menu.Item name='Tree' active={activeItem === 'Tree'} onClick={this.handleItemClick} />
                </NavLink>
                <Menu.Menu position='right'>
                    <Menu.Item name='logout' active={activeItem === 'Logout'} onClick={this.handleItemClick} />
                </Menu.Menu>
            </Menu>
        );
    }
}

NavBar.propTypes = {};
NavBar.defaultProps = {};

export default NavBar;
