import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EditorSelections {
    HOME,
    PAGES
}

export interface EditorSlice {
    editorSelection: EditorSelections
}

export const initialState: EditorSlice = {
    editorSelection: EditorSelections.PAGES
}

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setEditorSelection: (state, action: PayloadAction<EditorSelections>) => {
            return {...state, editorSelection: action.payload};
        }
    }
});

export default editorSlice;