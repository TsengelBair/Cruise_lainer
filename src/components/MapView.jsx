import React, { useState, useMemo, useCallback } from "react";
import dijkstra from "../lib/dijkstra";
import calculateWeight from "../lib/weight";
import Floor from "./Floor";
import VertexForm from "./VertexForm";

export default function MapView({ floors, initialStart = 0, initialEnd = 0 }) {
  // вычисляем веса ребер и делает граф неориентированным
  floors = useMemo(() => floors.map(({ edges, vertices, ...floor }) => ({
    vertices: vertices.sort((v1, v2) => v1.id - v2.id),
    edges: edges
      .map(({ from, to }) => ({
        from, to,
        weight: calculateWeight(
          ...[from, to].map(id => vertices.find(v => v.id === id))
        )
      }))

      .flatMap(edge => [
        edge,
        { from: edge.to, to: edge.from, weight: edge.weight }
      ]),
    ...floor
  })), [floors]);

  // по умолчанию стартовый и конечный этаж - нулевой этаж
  const [startFloor, setStartFloor] = useState(0);
  const [endFloor, setEndFloor] = useState(0);

  // стартовую и конечную вершину принимаем как props
  const [startVertex, setStartVertex] = useState(initialStart);
  const [endVertex, setEndVertex] = useState(initialEnd);

  // по умолчанию маршруты пусты, т.к. еще не нажата кнопка рассчитать
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
        // находим путь от стартовой точки до лифта на этом этаже
        floors[startFloor].elevatorId
      ));
      // повторно вызываем функцию, но уже имем маршрут от конечной точки на другом этаже до лифта
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