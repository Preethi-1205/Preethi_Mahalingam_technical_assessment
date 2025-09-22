from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import logging
import uvicorn
from contextlib import asynccontextmanager


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up FastAPI application...")
    yield
    logger.info("Shutting down FastAPI application...")

app = FastAPI(title="Pipeline Builder API", version="1.0.0", lifespan=lifespan)

@app.on_event("startup")
async def startup_event():
    logger.debug("Application starting up...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.debug("Application shutting down...")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

@app.get('/')
def read_root():
    return {'message': 'Pipeline Builder API', 'status': 'running'}

def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG)
    using Kahn's algorithm for topological sorting
    """
    if not nodes:
        return True
    
    
    graph = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    
    
    for edge in edges:
        if edge.source in graph and edge.target in graph:
            graph[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    processed = 0
    
    while queue:
        current = queue.pop(0)
        processed += 1
        
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    
    return processed == len(nodes)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse and analyze the pipeline structure
    Returns the number of nodes, edges, and whether it forms a DAG
    """
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        dag_status = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": dag_status,
            "message": "Pipeline analyzed successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error analyzing pipeline: {str(e)}")

if __name__ == "__main__":
    import sys
    
    
    HOST = "127.0.0.1"
    PORT = 8096
    
    try:
        print("\n" + "="*50)
        print("Starting FastAPI Backend Server")
        print("="*50)
        print("\nAPI Documentation URLs:")
        print(f"• Swagger UI: http://{HOST}:{PORT}/docs")
        print(f"• ReDoc: http://{HOST}:{PORT}/redoc")
        print("\nAPI Base URL:")
        print(f"• http://{HOST}:{PORT}")
        print("\nTest the API is running:")
        print(f"• Open http://{HOST}:{PORT}/docs in your browser")
        print(f"• Or use: curl http://{HOST}:{PORT}")
        print("\nPress CTRL+C to stop the server")
        print("="*50 + "\n")
        
        
        uvicorn.run(
            app,
            host=HOST,
            port=PORT,
            reload=False  
        )
    except Exception as e:
        logger.error(f"Error starting server: {e}")
        sys.exit(1)
