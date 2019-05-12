import moment from 'moment';
import Start from './start';
import Result from './result';
import renderCells from './render-cells';

const COLORS = ['red', 'green', 'yellow', 'pink', 'blue', 'grey', 'cyan', 'brown'];

// Возвращает все цвета в двойном количестве, отсортированные случайным образом
const getCells = () => COLORS.concat(COLORS).sort(() => Math.random() - 0.5);

const mainContainer = document.querySelector('main');
const gameContainer = mainContainer.querySelector('.game');
const cellsContainer = gameContainer.querySelector('.game-field');

const resultComponent = new Result();
const startComponent = new Start();

// Эта фунукция будет запущена по кнопке Старт
const startTimer = () => {
  if (resultComponent.getElement()) {
    mainContainer.removeChild(resultComponent.getElement());
    resultComponent.unrender();
  }
  const startTime = Date.now();
  let duration;
  const update = () => {
    duration = Date.now() - startTime;
    startComponent.update(`${moment.utc(duration).format('mm:ss.SSS')}`);
  };
  const interval = setInterval(update, 9);

  // Возвращщаем функцию, которая будет запущена по окончании игры
  return () => {
    clearInterval(interval);
    mainContainer.appendChild(resultComponent.render());
    resultComponent.update(duration);
  };
};

startComponent.setOnClick(() => {
  const stopTimer = startTimer();
  renderCells(getCells(), cellsContainer, stopTimer);
});

const reset = (component, container) => {
  container.removeChild(component.getElement());
  component.unrender();
};

resultComponent.setOnSubmit(() => reset(resultComponent, mainContainer));
resultComponent.setOnReset(() => reset(resultComponent, mainContainer));
resultComponent.setOnEsc(() => reset(resultComponent, mainContainer));

gameContainer.appendChild(startComponent.render());
