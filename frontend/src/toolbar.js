import { DraggableNode } from './draggableNode';
import './styles/app.css';

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar">
            <h2 className="toolbar-title">Pipeline Builder</h2>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='conditional' label='Conditional' />
                <DraggableNode type='aggregate' label='Aggregate' />
            </div>
        </div>
    );
};