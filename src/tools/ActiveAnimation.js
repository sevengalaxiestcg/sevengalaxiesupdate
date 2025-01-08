
function ActiveAnimation(className, effect, all) {

  try {
    var elements = document.getElementsByClassName(className);
    if (all) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(effect);
        void elements[i].offsetWidth;
        elements[i].classList.add(effect);
      }
    } else {
      var element = elements[0];
      element.classList.remove(effect);
      void element.offsetWidth;
      element.classList.add(effect);
    }
  }
  catch (error) { }

}
export default ActiveAnimation; 