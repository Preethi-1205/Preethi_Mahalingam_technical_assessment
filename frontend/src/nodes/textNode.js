import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Position, Handle } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [variables, setVariables] = useState([]);
  const [currText, setCurrText] = useState(data?.text || '');
  const [nodeSize, setNodeSize] = useState({ width: 250, height: 120 });
  const textareaRef = useRef(null);
  const extractVariables = useCallback((text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const varName = match[1].trim();
      if (varName && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
        matches.push(varName);
      }
    }
    
    return [...new Set(matches)];
  }, []);

  const updateNodeSize = useCallback((text) => {
    if (textareaRef.current) {
      const lines = text.split('\n');
      const charWidth = 8; 
      const lineHeight = 20;
      const padding = 40;
      const minWidth = 250;
      const minHeight = 120;
      
      const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b, '');
      const calculatedWidth = Math.max(minWidth, longestLine.length * charWidth + padding);
      const calculatedHeight = Math.max(minHeight, lines.length * lineHeight + padding);
      
      setNodeSize({
        width: Math.min(calculatedWidth, 400),
        height: Math.min(calculatedHeight, 300)
      });
    }
  }, []);

  useEffect(() => {
    const vars = extractVariables(currText);
    setVariables(vars);
    updateNodeSize();
  }, [currText, updateNodeSize, extractVariables]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const dynamicHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>i</mi><mi>d</mi></mrow><mo>−</mo></mrow><annotation encoding="application/x-tex">{id}-</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">i</span><span class="mord mathnormal">d</span></span><span class="mord">−</span></span></span></span>{variable}`,
  }));

  const staticHandles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <div 
      className="text-node"
      style={{ width: nodeSize.width, height: nodeSize.height }}
    >
      {staticHandles.map((handle, index) => (
        <Handle
          key={`static-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
      
      {dynamicHandles.map((handle, index) => (
        <Handle
          key={`dynamic-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      {variables.map((variable, index) => (
        <div
          key={`label-${variable}`}
          className={`text-node-variable text-node-variable-${index}`}
        >
          {variable}
        </div>
      ))}


      <div className="node-header">
        <h3 className="node-title">
          Text
        </h3>
      </div>

      
      <div className="node-content">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with variables like {{variable_name}}"
          className="text-node-textarea"
          style={{ height: nodeSize.height - 80 }}
        />
      </div>
    </div>
  );
};
