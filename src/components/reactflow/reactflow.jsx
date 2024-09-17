import React from 'react';
import { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';

import "../../style.css";
import './reactflow.css';
import { Canvas } from '@react-three/fiber';

const initialNodes = [

  // Interaktionsgestaltung

  { 
    id: '1', 
    type: 'custom',
    position: { x: 200, y: 10 },
    style: {
      background: '#00ae56',
      color: '#fff',
      border: 'none',
      width: 200
    }, 
    data: { 
      label: 'Interaktionsgestaltung',
      selects: {
        'handle-1': 'straight',
        'handle-2': 'straight',
        'handle-3': 'straight',
        'handle-4': 'straight',
      } } },

  // Konzept

  { 
    id: '2', 
    position: { x: 50, y: 100 },
    style: {
      background: '#0050e1',
      border: 'none',
      color: '#fff',
    },  
    data: { label: 'Konzept' } 
  },

  // Creative Coding

  { 
    id: '3', 
    position: { x: 300, y: 150 },
    style: {
      background: '#2f2f2f',
      border: 'none',
      color: '#fff',
    },   
    data: { label: 'Creative Coding' } 
  },

  // Informationsgestaltung

  { 
    id: '4', 
    position: { x: 50, y: 200 },
    style: {
      background: '#ff5400',
      border: 'none',
      color: '#fff',
      width: 200
    },   
    data: { label: 'Informationsgestaltung' } 
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'straight', sourceHandle: 'handle-3', targetHandle: 'handle-1', animated: true },
                      { id: 'e1-3', source: '1', target: '3', type: 'straight' },
                      { id: 'e2-3', source: '2', target: '3', type: 'straight' },
                      { id: 'e2-4', source: '2', target: '4', type: 'straight' },
                      { id: 'e3-4', source: '3', target: '4', type: 'straight' },
                    ];


// Custom node three.js under construction

/* function canvasNode({data}) {
  const onChange = useCallback((event) => {
    console.log("event");
  }, []);

  return (
    <div className="canvas-node">
      <Canvas >
        <mesh>
          <boxGeometry args={[1, 1, 1]} position={[0, 0, 0]} />
          <meshStandardMaterial color={"#1455d9"} />
        </mesh>
      </Canvas>
    </div>
  );
} */

export default function Flow() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useNodesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((es) => es.concat(params)), [setEdges]);

  return (
    
      <ReactFlow 
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        panOnDrag={false}
        autoPanOnNodeDrag={false}
        fitView={true}
        panOnScroll={false}
        zoomOnScroll={false} />
    
  );
}