import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
import { Segment, Divider } from 'semantic-ui-react';
import { Map } from 'immutable';
import utilFn from './utilFunctions';


class MyTodoEditor extends Component {

    constructor(){
        super();

        this.state = {
            editorState: EditorState.createEmpty(),
            editorPadding: 'very'
        };

        const TODO_TYPE = 'todo';
        this.blockRenderMap = Map({
            [TODO_TYPE]: {
                element: 'div',
            }
        }).merge(DefaultDraftBlockRenderMap);

        this.onChange = this.onChange.bind(this);

        this.handleBeforeInput = this.handleBeforeInput.bind(this);
        this.getEditorState = () => this.state.editorState;
        this.blockRendererFn = utilFn.getBlockRendererFn(this.getEditorState, this.onChange);

        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.blockStyleFn = this.blockStyleFn.bind(this);
        this.onTab = (e) => this._onTab(e);
        this.handleReturn = this.handleReturn.bind(this);
    }

    _onTab(e) {
        const maxDepth = 2;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    /* to maintain the focus of the editor while starting */
    componentDidMount(){
        this.refs.editor.focus();
    }

    onChange(editorState){
        this.setState({
            editorState
        });
    }

    handleReturn(e, editorState){
        console.log(this.state.editorState.getCurrentContent().getPlainText());
    }

    blockStyleFn(block) {
        switch (block.getType()) {
            case 'todo':
                return 'block block-todo';
            default:
                return 'block';
        }
    }

    handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    handleBeforeInput(str){
        if(str !== '.'){
            return false;
        }

        const { editorState } = this.state;
        const selection = editorState.getSelection();

        /* Get the block key */
        const currentBlock = editorState.getCurrentContent()
            .getBlockForKey(selection.getStartKey());

        const blockType = currentBlock.getType();
        const blockLength = currentBlock.getLength();
        if(blockLength === 1 && currentBlock.getText() === '1'){
            console.log(blockType);
            this.onChange(utilFn.resetBlockType(editorState, 'ordered-list-item'));
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className='svgDiv' id='style-4' onClick={this.focus}>
                <h2>Start with your notes here..</h2>
                <Divider />
                <Editor
                    className='editor'
                    onTab={this.onTab}
                    handleReturn={this.handleReturn}
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    ref='editor'
                    blockRenderMap={this.blockRenderMap}
                    blockRendererFn={this.blockRendererFn}
                    handleBeforeInput={this.handleBeforeInput}
                />
            </div>
        );
    }
}

export default MyTodoEditor;
