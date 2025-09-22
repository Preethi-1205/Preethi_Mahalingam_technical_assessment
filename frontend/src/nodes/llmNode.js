import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const fields = [
    {
      name: 'model',
      type: 'select',
      label: 'Model',
      defaultValue: 'gpt-3.5-turbo',
      options: [
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'claude-3', label: 'Claude 3' },
        { value: 'llama-2', label: 'Llama 2' }
      ]
    },
    {
      name: 'temperature',
      type: 'number',
      label: 'Temperature',
      defaultValue: 0.7,
      min: 0,
      max: 2,
      step: 0.1,
      placeholder: '0.7'
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: '33%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: '66%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      fields={fields}
      handles={handles}
      className="llm-node"
    />
  );
};