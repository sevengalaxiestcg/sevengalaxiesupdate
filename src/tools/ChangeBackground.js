import ReactGA from 'react-ga';

function ChangeBackground(value) {

  const localTheme = window.localStorage.getItem("sevengalaxies@theme");
  let background_max;
  let background_old;

  switch (localTheme) {
    case 'SevenG':
      background_old = parseInt(window.localStorage.getItem("sevengalaxies@bg_SevenG") || 1);
      background_max = 4;
      break;
    case 'Gaia':
      background_old = parseInt(window.localStorage.getItem("sevengalaxies@bg_Gaia") || 1);
      background_max = 21;
      break;
    case 'Stroj':
      background_old = parseInt(window.localStorage.getItem("sevengalaxies@bg_Stroj") || 1);
      background_max = 21;
      break;
    case 'Adroit':
      background_old = parseInt(window.localStorage.getItem("sevengalaxies@bg_Adroit") || 1);
      background_max = 21;
      break;
    case 'Majik':
      background_old = parseInt(window.localStorage.getItem("sevengalaxies@bg_Majik") || 1);
      background_max = 21;
      break;
    default:
  }

  if (!background_old) {
    background_old = 0;
  }

  const background_new =
    (background_old + value < 1
      ? background_max
      : (background_old + value > background_max
        ? 1
        : background_old + value));

  window.localStorage.setItem("sevengalaxies@bg_" + localTheme, background_new);

  ReactGA.event({
    category: 'Background',
    action: localTheme + background_new,
    label: 'Trocou para ' + localTheme + background_new
  });

  try {

    var element = document.body;
    element.className = "";
    void element.offsetWidth;
    element.classList.add(localTheme + background_new);

    // element.classList.add("teste");
  }
  catch (error) { }

  // setBackground(localTheme + background_new);

  // }
  // return (
  //   <div className="background-control" onClick={() => handleBackground(props.value)}></div>
  // )
}
export default ChangeBackground;