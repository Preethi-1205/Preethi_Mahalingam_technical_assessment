import React, { useState, useEffect, memo } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = memo(({ 
  id, 
  data, 
  title, 
  fields = [], 
  handles = [], 
  className = '',
  style = {},
  onFieldChange,
  dynamicHandles = [],
  customContent,
  nodeColor = '#ffffff'
}) => {
  const [fieldValues, setFieldValues] = useState({});

  useEffect(() => {
    // Initialize field values from data
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    setFieldValues(initialValues);
  }, [data, fields]);

  const handleFieldChange = (fieldName, value) => {
    const newValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(newValues);
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  const renderField = (field) => {
    const value = fieldValues[field.name] || '';
    
    switch (field.type) {
      case 'text':
        return (
          <input
            key={field.name}
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="node-input"
          />
        );
      case 'textarea':
        return (
          <textarea
            key={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="node-textarea"
            rows={field.rows || 3}
          />
        );
      case 'select':
        return (
          <select
            key={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="node-select"
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            key={field.name}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            className="node-input"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`base-node ${className}`} style={style}>
      {handles.map((handle, index) => (
        <Handle
          key={`<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>h</mi><mi>a</mi><mi>n</mi><mi>d</mi><mi>l</mi><mi>e</mi><mi mathvariant="normal">.</mi><mi>t</mi><mi>y</mi><mi>p</mi><mi>e</mi></mrow><mo>−</mo></mrow><annotation encoding="application/x-tex">{handle.type}-</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">han</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">e</span><span class="mord">.</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mord mathnormal">p</span><span class="mord mathnormal">e</span></span><span class="mord">−</span></span></span></span>{handle.position}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id || `<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>i</mi><mi>d</mi></mrow><mo>−</mo></mrow><annotation encoding="application/x-tex">{id}-</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">i</span><span class="mord mathnormal">d</span></span><span class="mord">−</span></span></span></span>{handle.type}-${index}`}
          style={handle.style}
        />
      ))}
      
      {dynamicHandles.map((handle, index) => (
        <Handle
          key={`dynamic-<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>h</mi><mi>a</mi><mi>n</mi><mi>d</mi><mi>l</mi><mi>e</mi><mi mathvariant="normal">.</mi><mi>t</mi><mi>y</mi><mi>p</mi><mi>e</mi></mrow><mo>−</mo></mrow><annotation encoding="application/x-tex">{handle.type}-</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">han</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">e</span><span class="mord">.</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mord mathnormal">p</span><span class="mord mathnormal">e</span></span><span class="mord">−</span></span></span></span>{index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      <div className="node-header">
        <h3 className="node-title">{title}</h3>
      </div>

      <div className="node-content">
        {fields.map(field => (
          <div key={field.name} className="node-field">
            {field.label && (
              <label className="node-label">{field.label}:</label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
});
