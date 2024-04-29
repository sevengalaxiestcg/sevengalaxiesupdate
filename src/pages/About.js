import React from 'react';
import ReactGA from 'react-ga';

import './About.css';
import SGU from '../images/SevenG_Universe.png';
import instagram from '../images/social/Instagram.png';
import facebook from '../images/social/Facebook.png';
import twitter from '../images/social/Twitter.png';
import andregt500 from "../images/Andregt500.png";



function About() {

  ReactGA.modalview('Sobre');
  ReactGA.event({
    category: 'Navegação',
    action: 'Sobre',
    label: 'Visualizou Sobre'
  });

  return (
    <div className="about" >
      <div className="about-container">
        <div className="about-7g">
          <img src={SGU} alt="7G Universe" />
          <div className="about-title">
            <p>Descubra o Novo Universo!</p>

          </div>
          <div className="about-message">
            <p>
              7G Universe é uma empresa 100% nacional que está por trás do desenvolvimento do
              card game Seven Galaxies, um jogo com artes fantásticas e mecânicas inovadoras,
              que já se tornou uma opção de entretenimento para os amantes de card games e jogos estratégicos.
          </p>
            <p />
            <p>
              Comprometidos com o crescimento desse novo universo, a empresa visa expandir sua franquia através
              de livros, HQ's, aplicativos e outros jogos derivados, promovendo assim cada vez mais imersão em
              suas histórias e diversão em seus produtos.
          </p>
            <p />
            <p>
              Manter uma relação muito próxima com fãs e apoiadores é um dos pilares principais da 7G Universe,
              que está atenta aos feedbacks de seus clientes e prontamente disposta a dar o suporte necessário.
              Ao longo dos últimos anos a empresa se dedicou a ouvir com carinho críticas, opiniões e sugestões
              de centenas de jogadores, o que foi essencial para a criação de um card game épico,
              do jeito que todos merecem!
          </p>
          </div>
        </div>
        <div className="about-divisa">

          <div className="about-linha large" />
          <div className="about-social">
            <a target="_blank" href="https://www.instagram.com/7guniverse" rel="noopener noreferrer">
              <img src={instagram} alt="Instagram" />
            </a>
            <div className="about-linha small" />
            <a target="_system"
              href={navigator.userAgent.match(/Android/i)
                ? "fb://page/1185949158145664"
                : "https://www.facebook.com/1185949158145664"}
              rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" />
            </a>
            <div className="about-linha small" />

            <a target="_blank" href="https://www.twitter.com/7guniverse" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" />
            </a>
          </div>
          <div className="about-linha large" />
        </div>

        <div className="about-developer">
          <div className="about-andregt500">
            <p> Powered by </p>
            <img src={andregt500} alt="Instagram" />
          </div>
          <div className="about-developer-message">
            <p>
              Em 2020, AndreGT500 surge como uma startup voltada para <i>Web Applications</i>,
              visando proporcionar experiências únicas, eficientes e disponíveis
              para todas as plataformas e dispositivos, utilizando as mais atuais tecnologias.
            {/* Idealizado por André Borba de Souza, analista e desenvolvedor de software
            a mais de 12 anos. */}

              {/* Oi, eu gostaria de dizer que a minha empresa é muito legal,
              faço uns apps da hora, você não vai se arrepender.
              Vem acelerar comigo, VRUUUUMMMM */}
            </p>
            <p>
              <b>contato: <a className="about-developer-email" target="_blank" href="mailto:andregt500@yahoo.com.br" rel="noopener noreferrer">AndreGT500@yahoo.com.br</a></b>
            </p>
            {/* <div className="about-social">
              <img src={react} alt="Instagram" />
              <img src={pwa} alt="Instagram" />
              <img src={git} alt="Instagram" />
            </div> */}
          </div>

        </div>
      </div>
    </div>


  );
}

export default About;