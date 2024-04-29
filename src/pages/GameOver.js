import React from 'react';
import ReactGA from 'react-ga';
import './GameOver.css';


function GameOver(props) {

  ReactGA.modalview('GameOver');
  ReactGA.event({
    category: 'Navegação',
    action: 'GameOver',
    label: 'Visualizou GameOver'
  });

  return (
    <div className="gameover" >
      <div className="gameover-container">

        <div>
          <p>SUA FORTALEZA</p><p>FOI DESTRUÍDA!</p>
        </div>
        <div className="gameover-button" onClick={() => props.novaPartida()}>
          NOVA BATALHA
        </div>

      </div>
    </div>
  )
}

export default GameOver;