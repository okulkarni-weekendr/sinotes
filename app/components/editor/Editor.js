import React, { Component } from 'react';
import { EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { Segment, Divider } from 'semantic-ui-react';
import Editor from 'draft-js-plugins-editor';
import Immutable from 'immutable';

class MyTodoEditor extends Component {

    constructor(){
        super();

        this.state = {
            editorState: EditorState.createEmpty(),
            editorPadding: 'very'
        };

        this.onChange = this.onChange.bind(this);
        this.onTab = this.onTab.bind(this);
    }

    onTab(e) {
        const { editorState } = this.props;
        const newEditorState = RichUtils.onTab(e, editorState, 2);
        if (newEditorState !== editorState) {
            this.onChange(newEditorState);
        }
    }

    onChange(editorState){
        this.setState({
            editorState,
            editorPadding: this.state.editorState.length * 10
        });

    }

    render() {
        return (
            <div className='svgDiv' id='style-4' onClick={this.focus}>
                <h2>Start with your notes here..</h2>
                <Divider />
                <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                onTab={this.onTab}/>
            </div>
        );
    }
}

export default MyTodoEditor;
