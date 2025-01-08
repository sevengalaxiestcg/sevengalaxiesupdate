function ChangeThumbWidth(value) {

  let vClass;

  switch (value) {
    case 'mini':
      vClass = 'mini';
      break;
    case 'small':
      vClass = 'small';
      break;
    case 'medium':
      vClass = 'medium';
      break;
    default:
      vClass = 'medium';
  }

  window.localStorage.setItem("sevengalaxies@thumbWidth", vClass);
  try {
    var containers = document.querySelectorAll('.deckBuilder-body-cards-container');
    var items = document.querySelectorAll('.deckBuilder-card-thumb');

    containers.forEach(function (container) {
      container.classList.remove('medium', 'small', 'mini');
      container.classList.add(vClass);
    });

    items.forEach(function (item) {
      item.classList.remove('medium', 'small', 'mini');
      item.classList.add(vClass);

    });
  }

  catch (error) { }
}
export default ChangeThumbWidth;