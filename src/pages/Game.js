import React, { useEffect, useState } from 'react';
import Toolbar from '../components/Toolbar';
import Rodada from '../components/Rodada';
import Fortaleza from '../components/Fortaleza';
import AlertModal from '../pages/Modal';
import ChangeBackground from '../tools/ChangeBackground';

import './Game.css';

function Game() {
  const [sair, setSair] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  // useEffect(() => {
  // if (window.location.hash === '') {
  //   AtivaSair();
  // }
  // });

  useEffect(() => {
    ChangeBackground(0);
  }, []);

  // function AtivaSair() {
  //   if (Mobile()) {
  //     setSair(c => true);
  //   }
  // }

  function CloseModal() {
    window.location.assign('#play');
    setSair(false);

  }

  function Refresh() {
    setRefresh(atual => atual + 1);
  }

  // function Mobile() {
  //   if (navigator.userAgent.match(/Android/i)
  //     || navigator.userAgent.match(/webOS/i)
  //     || navigator.userAgent.match(/iPhone/i)
  //     || navigator.userAgent.match(/iPad/i)
  //     || navigator.userAgent.match(/iPod/i)
  //     || navigator.userAgent.match(/BlackBerry/i)
  //     || navigator.userAgent.match(/Windows Phone/i)
  //   ) {
  //     return true; // está utilizando celular
  //   }
  //   else {
  //     return false; // não é celular
  //   }
  // }



  return (
    <>
      <Toolbar refresh={() => Refresh()} />

      {sair
        ? <AlertModal
          onAction={() => CloseModal()}
          message={<div>Você está saindo da Partida.<br />Clique mais uma vez para Sair ou em Continuar.</div>}
          actionName="Continuar"
          cancelVisible={false} />
        : null
      }
      <main key={refresh}>
        {/* <SetLocalMatch /> */}
        <div className="background-control" onClick={() => ChangeBackground(-1)} />
        <div className="game">
          <Rodada />
          <Fortaleza refresh={() => Refresh()} />
        </div >
        <div className="background-control" onClick={() => ChangeBackground(1)} />
      </main>
      
      <div className="corporation"> © {anoAtual} 7G Universe</div>
    </>
  );
}

export default Game;