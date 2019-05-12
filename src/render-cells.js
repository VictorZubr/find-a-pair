import Cell from './cell';

const CLOSED_CLASS = 'closed';

const close = (color, container) => {
  const elements = container.querySelectorAll(`.${color}`);
  elements.forEach((element) => {
    element.classList.add(CLOSED_CLASS);
  });
};

const isCellOpened = element => !element.classList.contains(CLOSED_CLASS);
const isFirstClick = clicks => clicks.length === 1;
const isPairOpened = clicks => clicks.length === 2 && [...new Set(clicks)].length === 1;
const isGameFinished = container => Array.from(container.querySelectorAll('.cell')).every(isCellOpened);

export default (cells, container, stopFunction) => {
  const cellsContainer = container;
  cellsContainer.innerHTML = '';

  let stackOfClicks = [];
  cells.forEach((color) => {
    const cell = new Cell({ color });
    cell.setOnClick(({ color: clickedColor }) => {
      if (isCellOpened(cell.getElement())) {
        return;
      }
      stackOfClicks.push(clickedColor);
      if (isFirstClick(stackOfClicks)) {
        cell.getElement().classList.remove(CLOSED_CLASS);
        return;
      }
      if (isPairOpened(stackOfClicks)) {
        cell.getElement().classList.remove(CLOSED_CLASS);
      } else {
        close(stackOfClicks[0], cellsContainer);
      }
      stackOfClicks = [];
      if (isGameFinished(cellsContainer)) {
        stopFunction();
      }
    });

    cellsContainer.appendChild(cell.render());
  });
};
