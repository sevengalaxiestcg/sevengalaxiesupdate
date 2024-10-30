import React, { useState, useEffect } from 'react';
import Routes from './routes';
// import useStayAwake from "use-stay-awake";
import NoSleep from 'nosleep.js';
import ReactGA from 'react-ga';

//CSS imports 
import './fonts/MyFontsWebfontsKit.css'
import './background/Background.css'
import './global.css';
import './App.css';
import './AppResponsive.css';

function App() {
  // const device = useStayAwake();
  const [noSleepEnable, setNoSleepEnable] = useState(false);
  const trackingId = "UA-191725820-2";

  let noSleep = new NoSleep();

  useEffect(() => {
    // window.localStorage.setItem("theme", '');
    // window.location.assign('#play');
    // SetLocalMatch({}, "App");
    // document.addEventListener('contextmenu', event => event.preventDefault());--> RECOLOCAR ISSO PARA RETIRAR O CLICK DO BOTÃO DA DIREITA DO MOUSE

    ReactGA.initialize(trackingId, {
      gaOptions: {
        cookieFlags: 'SameSite=None; Secure'
      }
    });

    ReactGA.pageview(window.location.pathname + window.location.search);

    ReactGA.event({
      category: 'Navegação',
      action: 'App',
      label: 'Entrou no App',
      nonInteraction: true
    });

  }, []);

  return (
    < div className="app"

      onClick={() => {
        // if (device.canSleep)
        //   device.preventSleeping();
        if (!noSleepEnable) {
          noSleep.enable();
          setNoSleepEnable(true);
        }

      }}>
      <Routes />
    </div >
  );
}

export default App;