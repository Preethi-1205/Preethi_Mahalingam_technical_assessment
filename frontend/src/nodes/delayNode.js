import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const fields = [
    {
      name: 'delayAmount',
      type: 'number',
      label: 'Delay (seconds)',
      defaultValue: 1,
      min: 0.1,
      max: 3600,
      step: 0.1,
      placeholder: '1.0'
    },
    {
      name: 'delayType',
      type: 'select',
      label: 'Type',
      defaultValue: 'fixed',
      options: [
        { value: 'fixed', label: 'Fixed Delay' },
        { value: 'random', label: 'Random Delay' },
        { value: 'exponential', label: 'Exponential Backoff' }
      ]
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-trigger`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-delayed`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      fields={fields}
      handles={handles}
      className="delay-node"
    />
  );
};