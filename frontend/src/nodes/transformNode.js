import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const fields = [
    {
      name: 'transformation',
      type: 'select',
      label: 'Transform',
      defaultValue: 'uppercase',
      options: [
        { value: 'uppercase', label: 'To Uppercase' },
        { value: 'lowercase', label: 'To Lowercase' },
        { value: 'reverse', label: 'Reverse' },
        { value: 'trim', label: 'Trim Whitespace' },
        { value: 'json_parse', label: 'Parse JSON' }
      ]
    },
    {
      name: 'customScript',
      type: 'textarea',
      label: 'Custom Script',
      placeholder: 'Enter custom transformation code',
      rows: 2
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
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      fields={fields}
      handles={handles}
      className="transform-node"
    />
  );
};