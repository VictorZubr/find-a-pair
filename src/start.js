import Component from './component';

export default class Start extends Component {
  constructor() {
    super();
    this.time = '00:00.000';

    this.onClick = null;
    this.startButton = null;
    this.timeSpan = null;

    this.onClickBound = this.onComponentClick.bind(this);
  }

  onComponentClick() {
    const data = {
      color: this.color,
    };
    return typeof this.onComponentClick === 'function' && this.onClick(data);
  }

  getTemplate() {
    return `<div class="start">
        <p><button class="start-button">Старт</button></p>
        <p><span class="time">${this.time}</span></p>
    </div>`;
  }

  setOnClick(fn) {
    this.onClick = fn;
  }

  update(timeString) {
    this.timeSpan.textContent = timeString;
  }

  bind() {
    this.startButton = this.element.querySelector('.start-button');
    this.startButton.addEventListener('click', this.onClickBound);

    this.timeSpan = this.element.querySelector('.time');
  }

  unbind() {
    this.startButton.removeEventListener('click', this.onClickBound);
    this.startButton = null;
    this.timeSpan = null;
  }
}
