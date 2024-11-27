import { useMemo, useCallback } from "react";

export default function VertexForm({
  floors,
  startFloor,
  setStartFloor,
  endFloor,
  setEndFloor,
  startVertex,
  setStartVertex,
  endVertex,
  setEndVertex,
  findPath
}) {
  const floorOptions = useMemo(() => floors.map((_, index) => (
    <option key={index} value={index}>{index + 1}</option>
  )), [floors]);

  const vertexOptionElement = vertex => (
    <option key={vertex.id} value={vertex.id}>
      {vertex.id}
    </option>
  );
  const startFloorVertexOptions = useMemo(() =>
    vertexOptions(floors[startFloor]).map(vertexOptionElement)
  , [floors, startFloor]);
  const endFloorVertexOptions = useMemo(() =>
    vertexOptions(floors[endFloor]).map(vertexOptionElement)
  , [floors, endFloor]);

  const selectStartFloor = useCallback(event => {
    setStartFloor(parseInt(event.target.value));
    setStartVertex(0);
  }, [setStartFloor, setStartVertex]);
  const selectEndFloor = useCallback(event => {
    setEndFloor(parseInt(event.target.value));
    setEndVertex(0);
  }, [setEndFloor, setEndVertex]);

  return (
    <div className="form">
      <h3 className="formLabel">Выберите стартовую и конечную точку</h3>
      <label htmlFor="startVertex" className="label">Стартовая точка:</label>
      <select
        className="input"
        id="startVertex"
        value={startVertex}
        onChange={useCallback(selectInt(setStartVertex), [setStartVertex])}
      >{startFloorVertexOptions}</select>
      <label htmlFor="startFloor" className="label">Этаж:</label>
      <select
        className="input"
        id="startFloor"
        value={startFloor}
        onChange={selectStartFloor}
      >{floorOptions}</select>
      <br />
      <label htmlFor="endVertex" className="label">Конечная точка:</label>
      <select
        className="input"
        id="endVertex"
        value={endVertex}
        onChange={useCallback(selectInt(setEndVertex), [setEndVertex])}
      >{endFloorVertexOptions}</select>
      <label htmlFor="endFloor" className="label">Этаж:</label>
      <select
        className="input"
        id="endFloor"
        value={endFloor}
        onChange={selectEndFloor}
      >{floorOptions}</select>
      <button className="formButton" onClick={findPath}>Найти</button>
    </div>
  );
}

const selectInt = set => event => set(parseInt(event.target.value));
const vertexOptions = ({ vertices, excludedVertexIds }) => vertices
  .filter(vertex => !excludedVertexIds.has(vertex.id));