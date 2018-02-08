import { EditorState } from 'draft-js';

const getDefaultBlockData = ( blockType,  initialData = {}) => {
    switch(blockType){
        case 'ordered-list-item': return initialData;
        default: return initialData;
    }
};

const resetBlockType = (editorState, newType) => {

    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const key = selectionState.getStartKey();

    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);

    let newText = '';

    if(block.getLength() >= 2){
        newText = block.getText().substr(1);
    }

    /**
     * @param text
     * @param type
     * @param data
     */
    const newBlock = block.merge({
        text: newText,
        type: newType,
        data: getDefaultBlockData(newType)
    });

    const newContentState = contentState.merge({
        blockMap: blockMap.set(key, newBlock),
        selectionAfter: selectionState.merge({
            anchorOffset: 0,
            focusOffset: 0,
        })
    });

    return EditorState.push(editorState, newContentState, 'change-block-type');
};

const getBlockRendererFn = (getEditorState, onChange) => (block) => {
    const type = block.getType();
    switch(type) {
        case 'todo':
            return null;
        default:
            return null;
    }
};

const utilFn = {
    getBlockRendererFn,
    resetBlockType,
};

export default utilFn;