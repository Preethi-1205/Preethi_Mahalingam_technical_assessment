import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './styles/app.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const { nodes, edges } = useStore(selector, shallow);
    const [error, setError] = useState(null);

    const submitPipeline = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                }))
            };

            const response = await fetch('http://localhost:5000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setAlertData(result);
            setShowAlert(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setError(error.message);
            setAlertData({
                num_nodes: nodes.length,
                num_edges: edges.length,
                is_dag: false,
                error: 'Failed to connect to backend. Showing local analysis.'
            });
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertData(null);
    };

    return (
        <>
            <div className="submit-container">
                <button 
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                    onClick={submitPipeline}
                    disabled={isLoading || nodes.length === 0}
                >
                    {isLoading ? (
                        <>
                            <div className="loading-spinner" />
                            Analyzing Pipeline...
                        </>
                    ) : (
                        'Submit Pipeline'
                    )}
                </button>
                {nodes.length === 0 && (
                    <div className="empty-state">
                        Add some nodes to get started
                    </div>
                )}
            </div>

            {showAlert && alertData && (
                <>
                    <div className="alert-overlay" onClick={closeAlert} />
                    <div className="pipeline-alert">
                        <div className="alert-header">
                            <h3 className="alert-title">Pipeline Analysis</h3>
                            <button className="close-button" onClick={closeAlert}>×</button>
                        </div>
                        <div className="alert-content">
                            <p>Your pipeline has been analyzed with the following results:</p>
                            
                            <div className="alert-stats">
                                <div className="alert-stat">
                                    <div className="alert-stat-value">{alertData.num_nodes}</div>
                                    <div className="alert-stat-label">Nodes</div>
                                </div>
                                <div className="alert-stat">
                                    <div className="alert-stat-value">{alertData.num_edges}</div>
                                    <div className="alert-stat-label">Connections</div>
                                </div>
                                <div className="alert-stat">
                                    <div className="alert-stat-value">{alertData.is_dag ? '✓' : '✗'}</div>
                                    <div className="alert-stat-label">Valid DAG</div>
                                </div>
                            </div>

                            <div className={`dag-status ${alertData.is_dag ? 'valid' : 'invalid'}`}>
                                {alertData.is_dag 
                                    ? '✅ Your pipeline forms a valid Directed Acyclic Graph (DAG)' 
                                    : '⚠️ Your pipeline contains cycles or is not a valid DAG'
                                }
                            </div>

                            {alertData.error && (
                                <div className="error-message">
                                    Note: {alertData.error}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};