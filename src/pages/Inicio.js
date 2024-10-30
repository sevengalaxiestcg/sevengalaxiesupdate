import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import ReactGA from 'react-ga';
// import { FiMenu } from 'react-icons/fi';
import '../components/Toolbar.css';

import SetSessionMatch from '../tools/SetSessionMatch';
import SelectTheme from './SelectTheme/SelectTheme2';
import About from './About';
import Menu from './Menu';


function Toolbar(props) {
  const [menuOpen, setMenuOpen] = useState(props.menuOpen || true);
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

  // useEffect(() => {
  //   setMenuOpen(props.menuOpen);
  // });

  // useEffect(() => {
  //   //CONTROLANDO O BOTÃO VOLTAR
  //   if (history.action === 'POP') {
  //     return () => {
  //       if (window.location.hash !== '#menu') {
  //         setMenuOpen(false);
  //         setAbout(false);
  //       }
  //     }
  //   }
  // });

  function ToggleMenu() {
    // menuOpen
    //   ? window.history.back()
    //   : window.location.assign('#menu');

    setMenuOpen(true);
    setAbout(false);
  }

  function HandleOption(escolha) {

    if (escolha === 'tema') {
      setEscolheTheme(true);
      // ToggleMenu();
      // window.location = '/app/inicio'
    }
    else if (escolha === 'batalha') {
      // ToggleMenu();

      if (window.location.pathname !== '/app/game') {
        window.location = '/app/game';
      }
    }
    else if (escolha === 'novaBatalha') {

      SetSessionMatch({}, {}, true);
      // ToggleMenu();

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
    else if (escolha === 'cards') {
      window.location = '/app/cards';
    }
  }

  return (
    <div className="toolbar" >
      <div className="content-toolbar">

        {menuOpen
          ? <Menu handleOption={HandleOption} inicio={true} />
          : null}

        {about
          ? <>
            <div className={menuOpen ? "burger-menu open" : "burger-menu"}
              onClick={() => ToggleMenu()} >
              <div className="bar1" key="b1" />
              <div className="bar2" key="b2" />
              <div className="bar3" key="b3" />
            </div>
            <About> </About>
          </>
          : null}

        <SelectTheme
          onClose={() => { setEscolheTheme(false); setMenuOpen(true); }}
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