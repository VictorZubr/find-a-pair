import Component from './component';

export default class Cell extends Component {
  constructor(data) {
    super();
    this.color = data.color;
    this.isOpen = false;

    this.onClick = null;

    this.onClickBound = this.onComponentClick.bind(this);
  }

  onComponentClick() {
    const data = {
      color: this.color,
    };
    return typeof this.onComponentClick === 'function' && this.onClick(data);
  }

  getTemplate() {
    return `<div class="cell ${this.color} closed"></div>`;
  }

  setOnClick(fn) {
    this.onClick = fn;
  }

  bind() {
    this.element.addEventListener('click', this.onClickBound);
  }

  unbind() {
    this.element.removeEventListener('click', this.onClickBound);
  }
}
