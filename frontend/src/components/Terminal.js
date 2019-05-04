import React from 'react';
import { connect } from 'react-redux';
import { enterCommand, setCurrentCommand, addResult, setProcessing } from '../actions/actions';
import CommandPrompt from './CommandPrompt';
import Result from './Result';

const mapStateToProps = (state) => {
    return {
        commands: state.commands,
        results: state.results,
        currentCommand: state.currentCommand,
        isProcessing: state.isProcessing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (text) => dispatch(enterCommand(text)),
        resetCommand: () => dispatch(setCurrentCommand("")),
        addResult: (value) => dispatch(addResult(value)),
        setProcessing: (isProcessing) => dispatch(setProcessing(isProcessing))
    }
}

function processCommand(command, addResult) {
    return new Promise((resolve, reject) => {
        switch (command) {
            default:
                addResult("Sorry, that command could not be found");
                resolve();
        }
    });
}

const Terminal = (props) => {

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.setProcessing(true);
            processCommand(props.currentCommand, props.addResult).then(() => {
                props.handleSubmit(props.currentCommand);
                props.resetCommand();
                props.setProcessing(false);
            })
        }}>
            {props.commands.map((command, index) => {
                return (
                    <div key={index}>
                        <CommandPrompt active={false} text={command} />
                        <Result text={props.results[index]} />
                    </div>
                );
            })}
            <CommandPrompt text={props.currentCommand} active={!props.isProcessing} />
        </form>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Terminal);