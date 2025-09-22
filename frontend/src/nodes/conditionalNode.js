import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const fields = [
    {
      name: 'condition',
      type: 'select',
      label: 'Condition',
      defaultValue: 'if_true',
      options: [
        { value: 'if_true', label: 'If True' },
        { value: 'if_false', label: 'If False' },
        { value: 'if_empty', label: 'If Empty' },
        { value: 'if_not_empty', label: 'If Not Empty' }
      ]
    },
    {
      name: 'expression',
      type: 'text',
      label: 'Expression',
      placeholder: 'Enter condition expression'
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '35%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '65%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      fields={fields}
      handles={handles}
      className="conditional-node"
    />
  );
};