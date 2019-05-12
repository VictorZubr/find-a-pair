// Функция возвращает элемент разметки из шаблона
export default (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
