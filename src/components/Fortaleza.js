import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import ActiveAnimation from '../tools/ActiveAnimation';
import SetSessionMatch from '../tools/SetSessionMatch';
import AvisoCompra from './AvisoCompra';
import GameOver from '../pages/GameOver';
import menos from '../images/_.png';
import mais from '../images/+.png';
import { HiCheck } from 'react-icons/hi';


function Fortaleza(props) {
  const [session, setSession] = useState();

  const [fortaleza, setFortaleza] = useState();
  const [compras, setCompras] = useState([]);


  useEffect(() => {

    SetSessionMatch({}, {});

    const initialSession = JSON.parse(sessionStorage.getItem("sevengalaxies@fortaleza"));
    setSession(initialSession);

    setFortaleza(initialSession.fortaleza);
    setCompras(initialSession.compras);

  }, []);

  useEffect(() => {

    if (typeof session !== "undefined")
      SetSessionMatch({}, session);

  }, [session]);

  useEffect(() => {
    ActiveAnimation("fortaleza-count", "destaque");

    if (typeof fortaleza !== "undefined")
      setSession(atual => { return { ...atual, fortaleza: fortaleza } });
  }, [fortaleza]);

  useEffect(() => {

    if (typeof compras !== "undefined")
      setSession(atual => { return { ...atual, compras: compras } });
  }, [compras]);


  function AlterFortaleza(valor) {
    setFortaleza(atual => (atual + valor < 0 ? 0 : atual + valor));
    ActiveAnimation(valor < 0 ? "bt-movel -f" : "bt-movel +f", "destaque-bt");
    setCompras(
      compras.map(compra =>
      (compra.marco >= fortaleza + valor && !compra.checked
        ? { ...compra, on: true }
        : compra
      )
      )
    );
  }

  function ConfirmaCompra(compra) {

    compra.on && !compra.checked &&
      setCompras(compras.map(atual =>
      (atual.marco === compra.marco && atual.on
        ? { ...atual, checked: true, on: false }
        : atual
      ))
      );

    compra.on && !compra.checked &&
      ActiveAnimation("linha-aviso", "entrada");


  }

  function NovaPatida() {

    ReactGA.modalview('revanche');
    ReactGA.event({
      category: 'Navegação',
      action: 'revanche',
      label: 'Novo Batalha depois de Gameover'
    });

    SetSessionMatch({}, {}, true);
    props.refresh();
  }

  return (
    <div className="fortaleza" >
      <div className="reserva-movel-container">
        <div className="reserva-movel" id="fortaleza">
          <div className="bt-movel -f" onClick={() => AlterFortaleza(- 1)}>
            <img src={menos} alt="Menos" />
          </div>
          <div className="reserva-movel-num">
            <p className="fortaleza-count"> {fortaleza} </p>
          </div>
          <div className="bt-movel +f" onClick={() => AlterFortaleza(1)}>
            <img src={mais} alt="Mais" />
          </div>
        </div>
      </div>

      <div className="compra">

        <AvisoCompra countCompra={compras && compras.filter(compra => compra.on).length} />

        <ul className="compra-card">
          {compras && compras.map((compra) =>
            <div className="compra-marco" key={compra.marco}>
              <p
                className={compra.on ? 'compra-ativa' : (compra.checked ? 'compra-ok' : 'compra-inativa')}
                onClick={() => ConfirmaCompra(compra)}>
                {compra.marco}
              </p>
              <div className="marco-checked">
                {compra.checked
                  ? <HiCheck className="checked" />
                  : null}
              </div>
            </div>
          )}
        </ul>
      </div>

      {fortaleza <= 0
        ? <GameOver novaPartida={() => NovaPatida()} />
        : null}
    </div>
  )
}

export default Fortaleza;