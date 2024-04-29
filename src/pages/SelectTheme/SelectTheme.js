import React, { useState } from 'react';
// import './SelectTheme.css';
import { ThemeProvider } from "styled-components";
import { SevenGalaxiesTheme, GaiaTheme, StrojTheme } from "./themes";
import GlobalTheme from "./globalTheme"
import ChangeBackground from '../../tools/ChangeBackground';
import simbolo_SevenG from './images/Simbolo_SevenG.png';
import simbolo_Gaia from './images/Simbolo_Gaia.png';
import simbolo_Stroj from './images/Simbolo_Stroj.png';


function SelectTheme(props) {
  const [theme, setTheme] = useState(window.localStorage.getItem("sevengalaxies@theme"));

  function handleAction(tema) {
    window.localStorage.setItem("sevengalaxies@theme", tema);

    const localTheme = window.localStorage.getItem("sevengalaxies@theme");
    localTheme && setTheme(localTheme);

    ChangeBackground(0);

    window.history.back();
    props.onClose();
  }

  // useEffect(() => {
  //   const localTheme = window.localStorage.getItem("theme");
  //   localTheme && setTheme(localTheme);
  // }, []);

  return (
    <>
      <ThemeProvider theme={theme === "Stroj" ? StrojTheme : (theme === "Gaia" ? GaiaTheme : SevenGalaxiesTheme)}>
        <GlobalTheme />
      </ThemeProvider>

      {props.escolheTheme
        ? <div className="theme">
          <div className="theme-container">
            <div className="theme-sevenG" onClick={() => handleAction('SevenG')}>
              <img src={simbolo_SevenG} alt="7G Universe" />
              <div>
                <p> 7G UNIVERSE </p>
              </div>
            </div>
            <div className="theme-stroj" onClick={() => handleAction('Stroj')}>
              <img src={simbolo_Stroj} alt="Stroj" />
              <div>
                <p> GALÁXIA STROJ </p>
              </div>
            </div>
            <div className="theme-gaia" onClick={() => handleAction('Gaia')}>
              <img src={simbolo_Gaia} alt="Gaia" />
              <div>
                <p> GALÁXIA GAIA </p>
              </div>
            </div>
            {/* <div className="options">
              <button className="action" onClick={() => handleAction('SevenGalaxies')}>
                <div>7G Theme</div>
              </button>
              <button className="action" onClick={() => handleAction('Gaia')}>
                <div>Gaia Theme</div>
              </button>
              <button className="action" onClick={() => handleAction('Stroj')}>
                <div>Stroj Theme</div>
              </button>
            </div> */}
          </div>
        </div>
        : null}
    </>

  )

}

export default SelectTheme;