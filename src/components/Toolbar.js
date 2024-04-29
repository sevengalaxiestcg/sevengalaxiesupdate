import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
// import { FiMenu } from 'react-icons/fi';
import './Toolbar.css';

import SetSessionMatch from '../tools/SetSessionMatch';
import SelectTheme from '../pages/SelectTheme/SelectTheme2';
import About from '../pages/About';
import Menu from '../pages/Menu';


function Toolbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [escolheTheme, setEscolheTheme] = useState(false);
  const [about, setAbout] = useState(false);
  const history = useHistory();
  // useState(() => {
  //   const localTheme = window.localStorage.getItem("theme");
  //   console.log(localTheme);
  //   if (localTheme)
  //     return false;
  //   else
  //     return true;

  // });

  useEffect(() => {
    //CONTROLANDO O BOTÃO VOLTAR
    if (history.action === 'POP') {
      return () => {
        if (window.location.hash !== '#menu') {
          setMenuOpen(false);
          setAbout(false);
        }
      }
    }
  });


  function ToggleMenu() {
    menuOpen
      ? window.history.back()
      : window.location.assign('#menu');

    setMenuOpen(!menuOpen);
    setAbout(false);
  }

  function HandleOption(escolha) {

    if (escolha === 'tema') {
      setEscolheTheme(true);
      ToggleMenu();
    }
    else if (escolha === 'novo') {
      ReactGA.modalview('NovaBatalha');
      ReactGA.event({
        category: 'Navegação',
        action: 'NovaBatalha',
        label: 'Escolheu Nova Batalha'
      });

      SetSessionMatch({}, {}, true);
      props.refresh();
      ToggleMenu();

      if (window.location.pathname !== '/app/game') {
        window.location = '/app/game';
      }
    }
    else if (escolha === 'sobre') {
      setAbout(true);
    }
    else if (escolha === 'deckBuilder') {
      window.location = '/app/deckBuilder';
    }
  }

  return (
    <div className="toolbar" >
      <div className="content-toolbar">
        {/* <FiMenu
          className="menu"
          onClick={() => ToggleMenu()} /> */}

        <div className={menuOpen ? "burger-menu open" : "burger-menu"}
          onClick={() => ToggleMenu()} >
          <div className="bar1" key="b1" />
          <div className="bar2" key="b2" />
          <div className="bar3" key="b3" />
        </div>
        {menuOpen
          ? <Menu handleOption={HandleOption} />
          : null}

        {about
          ? <About />
          : null}

        <SelectTheme
          onClose={() => { setEscolheTheme(false); setMenuOpen(false); }}
          escolheTheme={escolheTheme}
          modal={true} />
      </div>
    </div>
  );
}

// const ToolbarGame = styled.div`
//   /* display: flex;
//   flex-direction: column;
//   align-items: center; */
//   /* box-shadow: 1px 10px 18px 7px #000; */

//   /* display: grid;
//   grid-template-columns: 3fr 1fr;
//   align-items: center;
//   box-shadow: 1px 10px 18px 7px #000; */


// `;

// const Content = styled.div` 
//   width: 90%;
//   display: grid;
//   grid-template-columns: 3fr 1fr;
//   align-items: center;

//   /* display:flex;
//   flex-direction: column;
//   align-items: center;
//   width: calc(100px + 20vmin); */
//   div {
//     display: flex;
//     flex-direction: column;
//     align-items: center; 
//   }
//   img {
//     width: calc(50vmin);
//   }
//   button {
//     width: calc(30px);
//   }
// `;



export default Toolbar;