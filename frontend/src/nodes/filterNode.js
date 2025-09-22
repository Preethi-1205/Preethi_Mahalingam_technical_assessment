import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const fields = [
    {
      name: 'filterType',
      type: 'select',
      label: 'Filter Type',
      defaultValue: 'contains',
      options: [
        { value: 'contains', label: 'Contains' },
        { value: 'equals', label: 'Equals' },
        { value: 'greater_than', label: 'Greater Than' },
        { value: 'less_than', label: 'Less Than' }
      ]
    },
    {
      name: 'filterValue',
      type: 'text',
      label: 'Filter Value',
      placeholder: 'Enter filter criteria'
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
      id: `${id}-filtered`,
      style: { top: '40%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-rejected`,
      style: { top: '60%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      fields={fields}
      handles={handles}
      className="filter-node"
    />
  );
};