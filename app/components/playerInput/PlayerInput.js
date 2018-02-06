import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PlayerInput extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;

        this.setState(() => {
            return {
                username: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='playerOneName'>{this.props.label}</label>
                    <input type='text'
                           className='form-control'
                           id={this.props.id}
                           placeholder="Enter username"
                           value={this.state.username}
                           onChange={this.handleChange}/>
                    <button
                        className='btn btn-outline-dark'
                        type='submit'
                        disabled={!this.state.username}>
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
PlayerInput.defaultProps = {};

export default PlayerInput;
