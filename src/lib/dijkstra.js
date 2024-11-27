export default function dijkstra(vertices, edges, start, end) {
  const distances = {};
  const previous = {}; // Для восстановления пути
  const queue = new Set(vertices.map(v => v.id));

  vertices.forEach(v => {
    distances[v.id] = Infinity;
    previous[v.id] = null;
  });

  distances[start] = 0;

  while (queue.size > 0) {
    // Находим вершину с минимальным расстоянием
    const minVertex = Array.from(queue).reduce((min, vertex) =>
      distances[vertex] < distances[min] ? vertex : min, Array.from(queue)[0]);

    if (minVertex === end) {
      const path = [];
      let current = end;
      while (current !== null) {
        path.unshift(current);
        current = previous[current];
      }
      return path;
    }

    queue.delete(minVertex);

    edges.forEach(edge => {
      if (edge.from === minVertex && queue.has(edge.to)) {
        const alt = distances[minVertex] + edge.weight;
        if (alt < distances[edge.to]) {
          distances[edge.to] = alt;
          previous[edge.to] = minVertex;
        }
      }
    });
  }

  return [];
};