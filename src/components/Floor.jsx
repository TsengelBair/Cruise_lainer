import React, { useState, useCallback } from "react";

export default function Floor({
  mapImage,
  vertices,
  edges,
  startVertex = undefined,
  endVertex = undefined,
  path = []
}) {
  const renderVertices = useCallback(() => vertices
    .filter(vertex => {
      // Отображаем только те вершины, которые либо начальная, либо конечная, либо входят в путь
      return vertex.id === startVertex || vertex.id === endVertex || path.includes(vertex.id);
    })
    .map(vertex => (
      <circle
        key={vertex.id}
        cx={vertex.x}
        cy={vertex.y}
        r="1"
        fill="red"
        opacity={vertex.id === startVertex || vertex.id === endVertex ? "1" : "0"}
      />
    ))
  , [startVertex, endVertex]);

  const renderEdges = useCallback(() => edges
    .filter(edge => {
      // Отображаем рёбра только если они полностью принадлежат пути
      return path.includes(edge.from) && path.includes(edge.to);
    })
    .map((edge, index) => {
      const fromVertex = vertices.find(v => v.id === edge.from);
      const toVertex = vertices.find(v => v.id === edge.to);
      if (!fromVertex || !toVertex) {
        console.error(`Vertex not found for edge: ${edge.from} -> ${edge.to}`);
        return null;
      }
      return (
        <line
          key={index}
          x1={fromVertex.x}
          y1={fromVertex.y}
          x2={toVertex.x}
          y2={toVertex.y}
          stroke="black"
          strokeWidth="0.5"
          opacity="1"
        />
      );
    }).filter(edge => edge !== null) // Убираем null значения
  , [path]);

  const [viewBox, setViewBox] = useState('0 0 0 0');
  const syncViewBox = useCallback(event => {
    const img = event.target;
    setViewBox(`0 0 ${img.naturalWidth} ${img.naturalHeight}`);
  });

  return (
    <div className="mapWrapper">
      <img src={mapImage} alt="Map" className="mapImage" onLoad={syncViewBox} />
      <svg className="path" viewBox={viewBox}>
        {renderEdges()}
        {renderVertices()}
      </svg>
    </div>
  );
};