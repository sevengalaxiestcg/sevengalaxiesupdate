
function ActiveAnimation(className, effect) {

  try {
    var element = document.getElementsByClassName(className)[0];

    element.classList.remove(effect);
    void element.offsetWidth;
    element.classList.add(effect);
  }
  catch (error) { }


}
export default ActiveAnimation; 