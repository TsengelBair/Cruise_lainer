import React, { useState, useMemo, useCallback } from "react";
import dijkstra from "../lib/dijkstra";
import calculateWeight from "../lib/weight";
import Floor from "./Floor";
import VertexForm from "./VertexForm";

export default function MapView({ floors, initialStart = 0, initialEnd = 0 }) {
  floors = useMemo(() => floors.map(({ edges, vertices, ...floor }) => ({
    vertices: vertices.sort((v1, v2) => v1.id - v2.id),
    edges: edges
      .map(({ from, to }) => ({
        from, to,
        weight: calculateWeight(
          ...[from, to].map(id => vertices.find(v => v.id === id))
        )
      }))
      // Создаем обратные ребра для каждого ребра в графе (т.е. граф неориентированный)
      .flatMap(edge => [
        edge,
        { from: edge.to, to: edge.from, weight: edge.weight }
      ]),
    ...floor
  })), [floors]);

  const [startFloor, setStartFloor] = useState(0);
  const [endFloor, setEndFloor] = useState(0);
  const [startVertex, setStartVertex] = useState(initialStart);
  const [endVertex, setEndVertex] = useState(initialEnd);
  const [startFloorPath, setStartFloorPath] = useState([]);
  const [endFloorPath, setEndFloorPath] = useState([]);

  const [
    updateStartFloor, updateEndFloor,
    updateStartVertex, updateEndVertex
  ] = useMemo(() => [
    setStartFloor, setEndFloor,
    setStartVertex, setEndVertex
  ].map(set => value => {
    set(value);
    setStartFloorPath([]);
    setEndFloorPath([]);
  }), []);

  const findPath = useCallback(() => {
    if (startFloor === endFloor) {
      const path = dijkstra(
        floors[startFloor].vertices,
        floors[startFloor].edges,
        startVertex,
        endVertex
      );
      setStartFloorPath(path);
      setEndFloorPath([]);
    } else {
      setStartFloorPath(dijkstra(
        floors[startFloor].vertices,
        floors[startFloor].edges,
        startVertex,
        floors[startFloor].elevatorId
      ));
      setEndFloorPath(dijkstra(
        floors[endFloor].vertices,
        floors[endFloor].edges,
        floors[endFloor].elevatorId,
        endVertex
      ));
    }
  }, [floors, startFloor, startVertex, endFloor, endVertex]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="floors">
          <Floor
            key={startFloor}
            startVertex={startVertex}
            endVertex={startFloor === endFloor ? endVertex : undefined}
            path={startFloorPath}
            {...floors[startFloor]}
          />
          {startFloor !== endFloor && <Floor
            key={endFloor}
            endVertex={endVertex}
            path={endFloorPath}
            {...floors[endFloor]}
          />}
        </div>
        <VertexForm
          setStartFloor={updateStartFloor}
          setEndFloor={updateEndFloor}
          setStartVertex={updateStartVertex}
          setEndVertex={updateEndVertex}
          {...{
            floors,
            startFloor,
            endFloor,
            startVertex,
            endVertex,
            findPath
          }}
        />
      </div>
    </div>
  );
};