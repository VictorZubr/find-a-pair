import moment from 'moment';
import Component from './component';

export default class Result extends Component {
  constructor() {
    super();
    this.result = '00:00:000';

    this.formElement = null;
    this.timeSpan = null;

    this.onComponentReset = null;
    this.onComponentSubmit = null;
    this.onComponentEsc = null;

    this.onFormSubmitBound = this.onComponentFormSubmit.bind(this);
    this.onFormResetBound = this.onComponentFormReset.bind(this);
    this.onEscBound = this.onComponentEscKeyup.bind(this);
  }

  onComponentFormReset(evt) {
    evt.preventDefault();
    return typeof this.onComponentReset === 'function' && this.onComponentReset();
  }

  onComponentFormSubmit(evt) {
    evt.preventDefault();
    return typeof this.onComponentSubmit === 'function' && this.onComponentSubmit();
  }

  onComponentEscKeyup(evt) {
    return (typeof this.onComponentEsc === 'function') && (evt.keyCode === 27) && this.onComponentEsc();
  }

  getTemplate() {
    return `<section class="result">
      <form class="output-form">
        <h2>Вы выиграли!</h2>
        <p>Затраченное время: <span class="time">${this.result}</span></p>
        <p><button class="ok" type="submit">Ok</button></p>
      </form>
    </section>`;
  }

  setOnSubmit(fn) {
    this.onComponentSubmit = fn;
  }

  setOnReset(fn) {
    this.onComponentReset = fn;
  }

  setOnEsc(fn) {
    this.onComponentEsc = fn;
  }

  update(duration) {
    this.timeSpan.textContent = `${moment.utc(duration).format('mm:ss.SSS')}`;
  }

  bind() {
    this.formElement = this.element.querySelector('.output-form');
    this.formElement.addEventListener('submit', this.onFormSubmitBound);
    this.formElement.addEventListener('reset', this.onFormResetBound);

    document.addEventListener('keyup', this.onEscBound);
    this.timeSpan = this.element.querySelector('.time');
  }

  unbind() {
    this.timeSpan = null;
    document.removeEventListener('keyup', this.onEscBound);

    this.formElement.removeEventListener('submit', this.onFormSubmitBound);
    this.formElement.removeEventListener('reset', this.onFormResetBound);
    this.formElement = null;
  }
}
