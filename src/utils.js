// Функция возвращает элемент разметки из шаблона
export const createComponentElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const shake = (element, time) => {
  const shakeClass = 'shake';
  element.classList.add(shakeClass);
  setTimeout(() => {
    element.classList.remove(shakeClass);
  }, time);
};
