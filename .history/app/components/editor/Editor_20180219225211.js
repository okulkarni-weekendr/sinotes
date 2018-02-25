import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
import { Divider } from 'semantic-ui-react';
import { Map } from 'immutable';
import {getDefaultdepthBinding, depthBindingUtil} from 'draft-js';
import utilFn from "./utilFunctions";
const {hasCommandModifier} = depthBindingUtil;


class Editor2 extends Component {

    constructor(){
        super();

        this.state = {
            editorState: EditorState.createEmpty(),
            editorPadding: 'very',
            recordId: 0,
            depthMap: new Map(),
            childMap: new Map()
        };

        const TODO_TYPE = 'todo';
        this.blockRenderMap = Map({
            [TODO_TYPE]: {
                element: 'div',
            }
        }).merge(DefaultDraftBlockRenderMap);

        this.onChange = this.onChange.bind(this);
        this.getEditorState = () => this.state.editorState;
        this.handledepthCommand = this.handledepthCommand.bind(this);
        this.depthBindingFn = this.depthBindingFn.bind(this);
        this.handleBeforeInput = this.handleBeforeInput.bind(this);
        this.onTab = (e) => this._onTab(e);
        this.handleReturn = this.handleReturn.bind(this);
        this.saveDepthMap = this.saveDepthMap.bind(this);
        this.saveChildMap = this.saveChildMap.bind(this);
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

    depthBindingFn(event){

        if (depthBindingUtil.hasCommandModifier(event) && event.depthCode === 83) {
            return 'saveChart';
        }else if(depthBindingUtil.hasCommandModifier(event) && event.depthCode === 13){
            return 'printMap';
        }else if(depthBindingUtil.hasCommandModifier(event) && event.depthCode === 80){
            return 'printEditorStateMap';
        }

        return getDefaultdepthBinding(event);
    }

    handledepthCommand(command){
        let editorState = this.state.editorState;
       
        if (command === 'saveChart') {
            return 'handled';
        }else if(command === 'printEditorStateMap'){
            let map = this.state.depthMap;
            let childMap = this.state.childMap;

            this.state.editorState.getCurrentContent().getBlockMap().forEach(k => console.log(k.getText(), k.getDepth()));
            map.forEach((v,k) => console.log('depthMap -> ',k,v));
            childMap.forEach((k,v) => console.log('childMap ->',k,v));
            return 'handled';
        }
        return 'not-handled';
    }

    saveDepthMap(){
        let blockMap = this.state.editorState.getCurrentContent().getBlockMap();
        let depthMap = new Map();
        
        blockMap.forEach(k => {
            let depth = k.getDepth();
            let text = k.getText();
            if(text.replace(/^\s+|\s+$/g, '') !== undefined){
                if(!depthMap.has(depth)){
                    this.setState({
                        depthMap: depthMap.set([text], depth)
                    }, () => {
                        console.log('depthMap when no depth -->', depth, text);
                        this.saveChildMap(depth, text);
                    });
                }else{
                    this.setState({
                        depthMap: depthMap.set(depthMap.get(depth).concat([text]), depth)
                    }, () => {
                        console.log('depthMap has depth -->', depth, text);
                        this.saveChildMap(depth, text);
                    });
                }
            }
        });
    }

    saveChildMap(depth, text){
        let childMap = this.state.childMap;
        let depthMap = this.state.depthMap;
       
        if(depthMap.has(depth-1)){ 
            let newdepth = depthMap.get(depth - 1)[depthMap.get(depth - 1).length - 1];
            if(depth < 3){
                this.setState({
                    childMap: childMap.set(childMap.get(newdepth).concat([text]), newdepth).set(text, [])
                });
            }else{
                this.setState({
                    childMap: childMap.set(childMap.get(newdepth).concat([text]), newdepth)
                });
            }
        }else{
            this.setState({
                childMap: childMap.set([], text)
            });
        }
    }

    handleReturn(e){
        return this.saveDepthMap();
    }

    handleBeforeInput(str){
        if(str !== '.'){
            return false;
        }

        const { editorState } = this.state;
        const selection = editorState.getSelection();

        const currentBlock = editorState.getCurrentContent()
            .getBlockFordepth(selection.getStartdepth());

        const blockType = currentBlock.getType();
        const blockLength = currentBlock.getLength();

        if(blockLength === 1 && currentBlock.getText() === '1'){
            this.onChange((utilFn.resetBlockType(editorState, 'ordered-list-item')));
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
                    editorState={this.state.editorState}
                    handledepthCommand={this.handledepthCommand}
                    onChange={this.onChange}
                    ref='editor'
                    depthBindingFn={this.depthBindingFn}
                    handleBeforeInput={this.handleBeforeInput}
                    onTab={this.onTab}
                    handleReturn={this.handleReturn}
                />
            </div>
        );
    }
}

export default Editor2;
