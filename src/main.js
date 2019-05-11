import Cell from './cell';

const COLORS = ['red', 'green', 'yellow', 'pink', 'blue', 'grey', 'cyan', 'brown'];

const container = document.querySelector('.game-field');

const cells = COLORS.concat(COLORS).sort(it => Math.random() - 0.5);

cells.forEach((color) => {
  const data = {
    color,
  };
  const cell = new Cell(data);
  cell.setOnClick(({ color }) => {


  });

  container.appendChild(cell.render());
});

// fields.forEach((field) => {
//   const data = {
//     id: field.fieldName.toLowerCase(),
//     isBlack: field.isBlack,
//   };
//   const chessCell = new ChessCell(data);
//   chessFiledContainer.appendChild(chessCell.render());
//
//   chessCell.setOnClick(({ id }) => {
//     clearGreenFields();
//     const moves = fields.find(({ fieldName }) => fieldName === id.toUpperCase()).knightMoves;
//     setGreenFields(moves);
//   });
// });
