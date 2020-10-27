import * as React from 'react';
import {connect} from 'react-redux';
import './_dashboard.scss';
import {ReduxDispatch, ReduxState} from "../../../configureStore";
import editorSlice, {EditorSelections} from "../../store/editorSlice";

const {setEditorSelection} = editorSlice.actions;

const mapStateToProps = (state: ReduxState) => {
    return {
        editorSelection: state.editor.editorSelection
    }
}

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
    return {
        setEditorSelection: (selection: EditorSelections) => {
            dispatch(setEditorSelection(selection))
        }
    }
}

interface DashboardProps {
    editorSelection: EditorSelections,
    setEditorSelection: (selection: EditorSelections) => void;
}

function Dashboard(props: DashboardProps) {

    return (
       <div className={'dashboard'}>
           <div className={'taskbar'}>
               <ul className={'taskbar__list'}>
                   <li className={'taskbar__item'}>
                       <button className={'taskbar__button'} onClick={() => props.setEditorSelection(EditorSelections.HOME)}>Home</button>
                   </li>
                   <li className={'taskbar__item'}>
                       <button className={'taskbar__button'} onClick={() => props.setEditorSelection(EditorSelections.PAGES)}>Pages</button>
                   </li>
               </ul>
           </div>
           <div className={'editor'}>
               <div className={'editor__content'}>
                   {props.editorSelection === EditorSelections.PAGES &&
                       <p>I am taking Bilo for a walk</p>
                   }
               </div>
           </div>
       </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);