import React from 'react';
import { connect } from 'react-redux';
import { setCurrentCommand } from '../actions/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentCommand: (e) => dispatch(setCurrentCommand(e.target.value))
    }
}

const CommandPrompt = (props) => {
    return (
        <div className="CommandPrompt">
            {props.active &&
            <input onChange={props.updateCurrentCommand} value={props.text} /> }
            {!props.active &&
            <p className="previousCommand">{props.text}</p>}
        </div>
    );
}


export default connect(
    null,
    mapDispatchToProps
)(CommandPrompt);