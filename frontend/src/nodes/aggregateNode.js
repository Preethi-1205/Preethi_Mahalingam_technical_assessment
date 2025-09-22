import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const AggregateNode = ({ id, data }) => {
  const fields = [
    {
      name: 'operation',
      type: 'select',
      label: 'Operation',
      defaultValue: 'sum',
      options: [
        { value: 'sum', label: 'Sum' },
        { value: 'average', label: 'Average' },
        { value: 'count', label: 'Count' },
        { value: 'min', label: 'Minimum' },
        { value: 'max', label: 'Maximum' },
        { value: 'concat', label: 'Concatenate' }
      ]
    },
    {
      name: 'separator',
      type: 'text',
      label: 'Separator',
      defaultValue: ', ',
      placeholder: 'For concatenation'
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input1`,
      style: { top: '25%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input2`,
      style: { top: '50%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input3`,
      style: { top: '75%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregate"
      fields={fields}
      handles={handles}
      className="aggregate-node"
    />
  );
};