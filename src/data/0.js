export default {

  vertices: [
    [0, 100, 75], // Столовая
    [30, 135, 75], // Вход в столовую
    [1, 158.7, 38], // Elev 1
    [20, 147.7, 38], // Точка перехода к лифту 1
    [21, 147.7, 30], // Точка перехода к лифту 2
    [2, 190, 75], // Галерея
    [40, 163, 75], // Вход в галерею
    [3, 293, 98], // Бар
    [50, 289, 86], // Вход в бар
    [51, 282, 86], // Около бара
    [4, 274, 50], // Туалет 1
    [60, 275, 58], // Вход в туалет 1
    [5, 324, 50], // Туалет 2
    [61, 325, 58], // Вход в туалет 2
    [70, 263.5, 30], // Начало верхнего коридора (между галереей и туалетом)
    [71, 263.5, 58], // Конец верхнего коридора
    // 113 - 125
    [113, 147.7, 21],
    [114, 154.7, 21],
    [115, 161.7, 21],
    [116, 168.7, 21],
    [117, 175.7, 21],
    [118, 182.7, 21],
    [119, 189.7, 21],
    [120, 196.7, 21],
    [121, 203.7, 21],
    [122, 210.7, 21],
    [123, 217.7, 21],
    [124, 224.7, 21],
    [125, 231.7, 21],
    // 126 - 138
    [126, 240.6, 21],
    [127, 247.6, 21],
    [128, 254.6, 21],
    [129, 261.6, 21],
    [130, 268.6, 21],
    [131, 275.6, 21],
    [132, 282.6, 21],
    [133, 289.6, 21],
    [134, 296.6, 21],
    [135, 303.6, 21],
    [136, 310.6, 21],
    [137, 317.6, 21],
    [138, 324.6, 21],
    // 152 - 164
    [152, 147.7, 129],
    [153, 154.7, 129],
    [154, 161.7, 129],
    [155, 168.7, 129],
    [156, 175.7, 129],
    [157, 182.7, 129],
    [158, 189.7, 129],
    [159, 196.7, 129],
    [160, 203.7, 129],
    [161, 210.7, 129],
    [162, 217.7, 129],
    [163, 224.7, 129],
    [164, 231.7, 129],
    // 165 - 177
    [165, 240.6, 129],
    [166, 247.6, 129],
    [167, 254.6, 129],
    [168, 261.6, 129],
    [169, 268.6, 129],
    [170, 275.6, 129],
    [171, 282.6, 129],
    [172, 289.6, 129],
    [173, 296.6, 129],
    [174, 303.6, 129],
    [175, 310.6, 129],
    [176, 317.6, 129],
    [177, 324.6, 129],
  ].map(([id, x, y]) => ({ id, x, y })),
  // map -> для преобразования массива в объект с полями 

  edges: [
    // Столовая
    [30, 0],
    [30, 1],
    [30, 20],
    [30, 113],
    [30, 114],
    [30, 152],
    [30, 153],
    [30, 154],
    [30, 155],
    // Лифт
    [1, 20],
    [1, 152],
    [1, 153],
    [1, 154],
    // Точка перехода к лифту
    [21, 1],
    [20, 21],
    [20, 1],
    [20, 113],
    [20, 114],
    [20, 152],
    [20, 153],
    [20, 154],
    [20, 155],
    // Галерея
    [40, 2],
    [40, 30],
    [40, 1],
    [40, 20],
    [40, 152],
    [40, 153],
    [40, 154],
    // Каюты
    // Для последовательных вершин динамически создаем ребра "_" это пустой параметр, т.к. map ожидает два параметра
    ...new Array(25).fill().map((_, index) => [113 + index, 113 + index + 1]),
    ...new Array(25).fill().map((_, index) => [152 + index, 152 + index + 1]),
    [113, 152],
    [129, 168],
    [130, 169],
    // Верхний корридор
    [70, 21],
    ...new Array(25).fill().map((_, index) => [70, 113 + index]),
    [71, 70],
    // Бар
    [50, 3],
    [51, 50],
    ...new Array(5).fill().map((_, index) => [51, 167 + index]),
    [51, 60],
    [51, 61],
    [51, 71],
    // Туалет
    [60, 4],
    [60, 71],
    [60, 50],
    [60, 51],
    ...new Array(5).fill().map((_, index) => [60, 167 + index]),
    [61, 5],
    [61, 60],
    [61, 50],
    [61, 51],
  ].map(([from, to]) => ({ from, to })),

  excludedVertexIds: new Set(
    new Array(79).fill().map((_, index) => 20 + index)
  ),

  elevatorId: 1,

};