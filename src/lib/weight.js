// Функция для расчета расстояния между вершинами по их id
export default ({x: x1, y: y1}, {x: x2, y: y2}) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};