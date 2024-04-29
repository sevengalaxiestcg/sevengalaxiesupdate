import React, { useState, useEffect } from 'react';
import AlertModal from '../pages/Modal';
import ActiveAnimation from '../tools/ActiveAnimation';

import menos from '../images/_.png';
import mais from '../images/+.png';
import seta_menos from '../images/seta_.png';
import seta_mais from '../images/seta+.png';
import nova_rodada from '../images/Nova-Rodada.png';
import SetSessionMatch from '../tools/SetSessionMatch';


function Rodada() {
  const [session, setSession] = useState();

  const [rodada, setRodada] = useState({});
  const [escolher, setEscolher] = useState();
  const [nivelMovel, setNivelMovel] = useState();
  const [nivelConquista, setNivelConquista] = useState();

  const [energiaMovel, setEnergiaMovel] = useState();
  const [energiaConquista, setEnergiaConquista] = useState();

  const [modal, setModal] = useState({ _id: "", visivel: false });

  useEffect(() => {
    SetSessionMatch({}, {});

    const initialSession = JSON.parse(sessionStorage.getItem("sevengalaxies@rodada"));
    setSession(initialSession);

    setRodada(initialSession.rodada);
    setEscolher(initialSession.escolher);
    setNivelMovel(initialSession.nivelMovel);
    setNivelConquista(initialSession.nivelConquista);
    setEnergiaMovel(initialSession.energiaMovel);
    setEnergiaConquista(initialSession.energiaConquista);
  }, []);

  useEffect(() => {

    if (typeof session !== "undefined")
      SetSessionMatch(session, {});

  }, [session]);

  useEffect(() => {
    ActiveAnimation("rodada-count", "destaque");
    if (rodada)
      setSession(atual => { return { ...atual, rodada: rodada, } });
  }, [rodada]);

  useEffect(() => {
    ActiveAnimation("nivelm-count", "destaque");
    if (typeof nivelMovel !== "undefined")
      setSession(atual => { return { ...atual, nivelMovel: nivelMovel } });
  }, [nivelMovel]);

  useEffect(() => {
    ActiveAnimation("energiam-count", "destaque");
    if (typeof energiaMovel !== "undefined")
      setSession(atual => { return { ...atual, energiaMovel: energiaMovel } });
  }, [energiaMovel]);

  useEffect(() => {
    ActiveAnimation("nivelc-count", "destaque-on");
    if (typeof nivelConquista !== "undefined")
      setSession(atual => { return { ...atual, nivelConquista: nivelConquista } });
  }, [nivelConquista]);

  useEffect(() => {
    ActiveAnimation("energiac-count", "destaque-on");
    if (typeof energiaConquista !== "undefined")
      setSession(atual => { return { ...atual, energiaConquista: energiaConquista } });
  }, [energiaConquista]);

  useEffect(() => {
    if (typeof escolher !== "undefined")
      setSession(atual => { return { ...atual, escolher: escolher } });
  }, [escolher]);


  function AlterMovel(indicador, valor) {
    if (!escolher) {
      if (indicador === 'nivel') {
        setNivelMovel(atual => (atual + valor < 0 ? 0 : (atual + valor > 10 ? 10 : atual + valor)));
        ActiveAnimation(valor < 0 ? "bt-movel -n" : "bt-movel +n", "destaque-bt");
      }
      else {
        setEnergiaMovel(atual => (atual + valor < 0 ? 0 : (atual + valor > 10 ? 10 : atual + valor)));
        ActiveAnimation(valor < 0 ? "bt-movel -e" : "bt-movel +e", "destaque-bt");
      }
    } else
      MostrarModalEscolha(0, escolher)
  }

  function AlterConquista(indicador, valor) {

    if (indicador === 'nivel') {
      setNivelConquista(atual => (atual + valor < 0 ? 0 : (atual + valor > 10 ? 10 : atual + valor)));
      nivelConquista > 0 && nivelConquista < 10 &&
        setNivelMovel(atual => (atual + valor < 0 ? 0 : (atual + valor > 10 ? 10 : atual + valor)));
    } else {
      setEnergiaConquista(atual => (atual + valor < 0 ? 0 : (atual + valor > 10 ? 10 : atual + valor)));
      energiaConquista > 0 && energiaConquista < 10 &&
        setEnergiaMovel(atual => (atual + valor < 0 ? 0 : (atual + valor > 10 ? 10 : atual + valor)));
    }
  }

  function MostrarModalConquista(_id, vlAtual, vlOperacao) {
    if (!escolher) {
      if ((vlOperacao > 0 && vlAtual < 10) || (vlOperacao < 0 && vlAtual > 0)) {
        window.location.assign('#modal');
        setModal({ _id: _id, visivel: true })
      }
    } else
      MostrarModalEscolha(0, escolher)
  }

  function NovaRodada(upNivel, upEnergia) {
    let nivelNew = nivelConquista;
    let energiaNew = energiaConquista;

    if (upNivel)
      nivelNew++;
    if (upEnergia)
      energiaNew++;

    setNivelMovel(nivelNew);
    setNivelConquista(nivelNew);

    setEnergiaMovel(energiaNew);
    setEnergiaConquista(energiaNew);

    setRodada({
      _id: rodada._id + 1,
      nivel: nivelNew,
      energia: energiaNew
    });

    setEscolher(false);
  }

  function EscolhaRodada() {
    if (rodada._id + 1 <= 2 && nivelConquista < 10 && energiaConquista < 10) {
      NovaRodada(true, true);
    }
    else {
      if (nivelConquista === 10 && energiaConquista === 10)
        NovaRodada(false, false);
      else {
        setNivelMovel(nivelConquista);
        setEnergiaMovel(energiaConquista);
        setEscolher(true);
      }
    }
  }

  function MostrarModalEscolha(_id, escolher) {
    if (escolher) {
      window.location.assign('#modal');
      setModal({ _id: _id, visivel: true })
    }
  }

  function CloseModal(_id) {
    // console.log(window.location.hash);
    setModal({ _id: _id, visivel: false });
  }

  return (
    <>
      <div className="rodada" >
        <div className="rodada-nova">
          {escolher
            ?
            <div className="rodada-escolha">
              {nivelConquista < 10 &&
                <div className={energiaConquista < 10 ? "rodada-button bt-first" : "rodada-button"} onClick={() => NovaRodada(true, false)}>
                  <p>+1N</p>
                </div>}
              {energiaConquista < 10 &&
                <div className="rodada-button" onClick={() => NovaRodada(false, true)}>
                  <p>+1E</p>
                </div>}
            </div>
            :
            <div className="rodada-button-new" onClick={EscolhaRodada}>
              {/* <p>NOVA RODADA</p> */}
              <img src={nova_rodada} alt="Menos" />
            </div >
          }
        </div >
        <div className="rodada-num" >
          <p className="rodada-count"> {rodada._id} </p>
        </div>
      </div >

      <div className="nivel" >
        {modal.visivel && modal._id === 0
          ? <AlertModal
            onAction={() => CloseModal(0)}
            message={<div> Você deve escolher entre +1N ou +1E antes de prosseguir!</div>}
            actionName="Entendi"
            cancelVisible={false} />
          : null
        }
        <div className="reserva-movel-container">
          <div className="reserva-movel">
            <div className="bt-movel -n" onClick={() => AlterMovel('nivel', - 1)}>
              <img src={menos} alt="Menos" />
            </div>
            <div className="reserva-movel-num">
              <p className="nivelm-count"> {nivelMovel} </p>
            </div>
            <div className="bt-movel +n" onClick={() => AlterMovel('nivel', 1)}>
              <img src={mais} alt="Mais" />
            </div>

          </div>
        </div>
        <div className="reserva-conquista">
          <button className="reserva-conquista-bt" onClick={() => MostrarModalConquista(1, nivelConquista, -1)} >
            <img src={seta_menos} alt="Menos" />
          </button>
          {modal.visivel && modal._id === 1
            ? <AlertModal
              onClose={() => CloseModal(1)}
              onAction={() => AlterConquista('nivel', -1)}
              message={<div>Deseja alterar o nível conquistado?<br />Faça isso somente se algum efeito permitir.</div>}
              actionName="Alterar"
              cancelVisible={true} />
            : null
          }
          <div className="reserva-conquista-num">
            <p className="nivelc-count"> {nivelConquista} </p>
          </div>
          <button className="reserva-conquista-bt" onClick={() => MostrarModalConquista(2, nivelConquista, 1)}>
            <img src={seta_mais} alt="Mais" />
          </button>
          {modal.visivel && modal._id === 2
            ? <AlertModal
              onClose={() => CloseModal(2)}
              onAction={() => AlterConquista('nivel', 1)}
              message={<div>Deseja alterar o nível conquistado?<br />Faça isso somente se algum efeito permitir.</div>}
              actionName="Alterar"
              cancelVisible={true} />
            : null
          }
        </div>
      </div>
      <div className="energia"  >
        <div className="reserva-movel-container">
          <div className="reserva-movel">
            <div className="bt-movel -e" onClick={() => AlterMovel('energia', - 1)}>
              <img src={menos} alt="Menos" />
            </div>
            <div className="reserva-movel-num">
              <p className="energiam-count"> {energiaMovel} </p>
            </div>
            <div className="bt-movel +e" onClick={() => AlterMovel('energia', 1)}>
              <img src={mais} alt="Mais" />
            </div>
          </div>
        </div>

        <div className="reserva-conquista">
          <button className="reserva-conquista-bt" onClick={() => MostrarModalConquista(3, energiaConquista, -1)} >
            <img src={seta_menos} alt="Menos" />
          </button>
          {modal.visivel && modal._id === 3
            ? <AlertModal
              onClose={() => CloseModal(3)}
              onAction={() => AlterConquista('energia', -1)}
              message={<div>Deseja alterar a energia conquistada?<br />Faça isso somente se algum efeito permitir.</div>}
              actionName="Alterar"
              cancelVisible={true} />
            : null
          }
          <div className="reserva-conquista-num">
            <p className="energiac-count"> {energiaConquista} </p>
          </div>
          <button className="reserva-conquista-bt" onClick={() => MostrarModalConquista(4, energiaConquista, 1)}>
            <img src={seta_mais} alt="Mais" />
          </button>
          {modal.visivel && modal._id === 4
            ? <AlertModal
              onClose={() => CloseModal(4)}
              onAction={() => AlterConquista('energia', 1)}
              message={<div>Deseja alterar a energia conquistada?<br />Faça isso somente se algum efeito permitir.</div>}
              actionName="Alterar"
              cancelVisible={true} />
            : null
          }
        </div>
      </div>



    </>
  )
}

export default Rodada;