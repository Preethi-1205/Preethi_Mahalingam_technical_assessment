# Pipeline Builder

A visual pipeline builder application with a React frontend and FastAPI backend. This application allows users to create, visualize, and analyze data processing pipelines using a drag-and-drop interface.

## Features

- Interactive drag-and-drop pipeline building
- Multiple node types (Input, Output, Transform, Filter, etc.)
- Real-time pipeline validation
- DAG (Directed Acyclic Graph) verification
- Responsive and modern UI
- RESTful API backend

## Tech Stack

### Frontend
- React
- React Flow (for node-based interface)
- CSS3 for styling
- Zustand for state management

### Backend
- FastAPI (Python)
- Uvicorn ASGI server
- Pydantic for data validation

## Getting Started

### Prerequisites
- Python 3.9 or higher
- Node.js 14 or higher
- npm/yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd [repo-name]
```

2. Set up the backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
The backend will start on http://localhost:8096

3. Set up the frontend
```bash
cd frontend
npm install
npm start
```
The frontend will start on http://localhost:3001

## API Documentation

- Swagger UI: http://localhost:8096/docs
- ReDoc: http://localhost:8096/redoc

## Project Structure

```
├── backend/
│   ├── main.py            # FastAPI application
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── nodes/        # Node components
│   │   ├── styles/       # CSS files
│   │   ├── App.js        # Main React component
│   │   └── index.js      # Entry point
│   ├── package.json
│   └── README.md
└── README.md
```

## Usage

1. Start both backend and frontend servers
2. Access the application at http://localhost:3001
3. Drag nodes from the toolbar to the canvas
4. Connect nodes to create a pipeline
5. Configure node parameters as needed
6. Submit the pipeline for analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details