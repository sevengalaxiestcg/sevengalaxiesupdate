import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { ThemeProvider } from "styled-components";
import { SevenGalaxiesTheme, GaiaTheme, StrojTheme } from "./themes";

import GlobalTheme from "./globalTheme"
import ChangeBackground from '../../tools/ChangeBackground';

import simbolo_SevenG from './images/Simbolo_SevenG.png';
import simbolo_Gaia from './images/Simbolo_Gaia.png';
import simbolo_Stroj from './images/Simbolo_Stroj.png';
//CSS imports 
import './SelectTheme.css';


function SelectTheme(props) {
  const [theme, setTheme] = useState(window.localStorage.getItem("sevengalaxies@theme"));

  function handleAction(tema) {
    window.localStorage.setItem("sevengalaxies@theme", tema);

    const localTheme = window.localStorage.getItem("sevengalaxies@theme");

    localTheme && setTheme(localTheme);

    ChangeBackground(0);

    ReactGA.event({
      category: 'Tema',
      action: tema,
      label: (props.modal ? 'Trocou para ' : 'Inicou com ')
    });

    if (props.modal) {
      // window.history.back();
      props.onClose();
    }
  }

  return (
    <>
      <ThemeProvider theme={theme === "Stroj" ? StrojTheme : (theme === "Gaia" ? GaiaTheme : SevenGalaxiesTheme)}>
        <GlobalTheme />
      </ThemeProvider>

      {props.escolheTheme
        ? <div className="theme">
          <div className="theme-container">
            <Link className="theme-block" onClick={() => handleAction('SevenG')} to={props.modal? window.location.pathname : '/app/game'} replace={props.modal ? true : false}>
              <div className="theme-background bg-sevenG"></div>
              <div className="theme-itens" id="sevenG">
                <div className="theme-itens-flex">
                  {!props.modal
                    ? <div className="theme-top">
                      <p>ESCOLHA SEU TEMA</p>
                    </div>
                    : <div className="theme-top-null" />
                  }
                  <div className="theme-simbolo" id="sevenG">
                    <img src={simbolo_SevenG} alt="7G Universe" />
                  </div>
                  <div className="theme-title">
                    <p> {"7G UNIVERSE"}</p>
                    <h1 className="carregafont">{" awbs"}</h1>
                  </div>
                </div>

              </div>

            </Link>
            <Link className="theme-block" onClick={() => handleAction('Stroj')} to={props.modal? window.location.pathname : '/app/game'} replace={props.modal ? true : false}>
              <div className="theme-background bg-stroj"></div>
              <div className="theme-itens" id="stroj">
                <div className="theme-itens-flex">
                  <div className="theme-simbolo">
                    <img src={simbolo_Stroj} alt="Stroj" />
                  </div>
                  <div className="theme-title">
                    <p> {"GALÁXIA STROJ"}</p>
                  </div>
                </div>
              </div>

            </Link>
            <Link className="theme-block" onClick={() => handleAction('Gaia')} to={props.modal? window.location.pathname : '/app/game'} replace={props.modal ? true : false} >
              <div className="theme-background bg-gaia"></div>
              <div className="theme-itens" id="gaia">
                <div className="theme-itens-flex">
                  <div className="theme-simbolo">
                    <img src={simbolo_Gaia} alt="Gaia" />
                  </div>
                  <div className="theme-title">
                    <p> {"GALÁXIA GAIA"}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        : null}
    </>

  )

}

export default SelectTheme;