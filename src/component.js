import createComponentElement from './utils';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error('Can not instantiate Component, only concrete one.');
    }
    this.element = null;
    this.template = null;
    this.errorString = 'You have to define template.';
  }

  getElement() {
    return this.element;
  }

  getTemplate() {
    throw new Error(this.errorString);
  }

  render() {
    this.element = createComponentElement(this.getTemplate());
    this.bind();
    return this.element;
  }

  unrender() {
    this.unbind();
    this.element = null;
  }
}
