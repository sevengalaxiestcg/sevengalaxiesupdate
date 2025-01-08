import React from 'react';
import ReactGA from 'react-ga';

import './About.css';
import SGU from '../images/SevenG_Universe.png';
import instagram from '../images/social/Instagram.png';
import facebook from '../images/social/Facebook.png';
import twitter from '../images/social/Twitter.png';
import tiktok from '../images/social/Tik-Tok.png';
import discord from '../images/social/Discord.png';
import whatsapp from '../images/social/Whatsapp.png';
import andregt500 from "../images/Andregt500.png";
import bruno from "../images/Bruno.png";



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
              7G Universe é uma empresa 100% nacional que desenvolve o card game Seven Galaxies, um jogo com artes
              fantásticas e mecânicas inovadoras, que vem encantando jogadores de todo o Brasil.
            </p>
            <p>
              Comprometidos com o crescimento desse novo universo, a empresa visa expandir sua franquia através
              de livros, HQ's, aplicativos e outros jogos derivados, promovendo assim cada vez mais imersão em
              suas histórias e diversão em seus produtos.
            </p>
            <p>
              Manter uma relação muito próxima com fãs e apoiadores é um dos pilares principais da 7G Universe,
              que está atenta aos feedbacks de seus clientes e prontamente disposta a dar o suporte necessário.
              Ao longo dos últimos anos a empresa se dedicou a ouvir com carinho críticas, opiniões e sugestões
              de centenas de jogadores, o que foi essencial para a criação de um card game épico,
              do jeito que todos merecem!
            </p>
          </div>
          <div className="about-subtitle">
            <p>Comunidade</p>
          </div>
          <div className="about-message">
            <p>
              Entre nos grupos oficiais abaixo para manter contato com outros galácticos e mergulhar fundo no Novo Universo!
            </p>
          </div>
          <div className="about-divisa">

            <div className="about-linha large" />
            <div className="about-social">
              <a target="_blank" href="https://chat.whatsapp.com/Bo9jtAVL6hh42zAdcknNnU" rel="noopener noreferrer">
                <img src={whatsapp} alt="WhatsApp" />
              </a>
              <div className="about-linha small" />
              <a target="_system"
                href={navigator.userAgent.match(/Android/i)
                  ? "https://www.facebook.com/groups/sevengalaxies"
                  : "https://www.facebook.com/groups/sevengalaxies"}
                rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" />
              </a>
              <div className="about-linha small" />
              <a target="_blank" href="https://discord.com/invite/wyRJYB9" rel="noopener noreferrer">
                <img src={discord} alt="Discord" />
              </a>
            </div>
            <div className="about-linha large" />
          </div>
          <div className="about-subtitle">
            <p>Redes sociais</p>
          </div>
          <div className="about-message">
            <p>
              Siga-nos nas rede sociais e fique por dentro de todas as novidades, eventos e muito mais!
            </p>
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

              <div className="about-linha small" />

              <a target="_blank" href="https://www.tiktok.com/@7guniverse " rel="noopener noreferrer">
                <img src={tiktok} alt="Tik Tok" />
              </a>
            </div>
            <div className="about-linha large" />
          </div>
          <div className="about-subtitle">
            <p>Desenvolvido por</p>
          </div>
          <div className="about-developer">
            <div className="about-andregt500">
              {/* <p> Powered by </p> */}
              <img src={andregt500} alt="Instagram" />
            </div>
            <div className="about-developer-message">
              <p>
                AndreGT500 by André Borba de Souza, engenheiro de software e dev a mais de 15 anos.<br></br>
                Participar desse projeto foi um grande desafio e uma honra. Tudo feito com muito esmero e carinho, aproveitem Galácticos! 💜
                {/*Versão 1: Em 2020, AndreGT500 surge como uma startup voltada para <i>Web Applications</i>,
                visando proporcionar experiências únicas, eficientes e disponíveis
                para todas as plataformas e dispositivos, utilizando as mais atuais tecnologias. */}
                {/* Idealizado por André Borba de Souza, analista e desenvolvedor de software
            a mais de 12 anos. */}

                {/* Oi, eu gostaria de dizer que a minha empresa é muito legal,
              faço uns apps da hora, você não vai se arrepender.
              Vem acelerar comigo, VRUUUUMMMM */}
              </p>
            </div>

          </div>
          <div className="about-divisa">
            <div className="about-linha large" />
          </div>
          <div className="about-developer">
            <div className="about-andregt500">
              {/* <p> Powered by </p> */}
              <img src={bruno} alt="Instagram" />
            </div>
            <div className="about-developer-message">
              <p>
                Desenvolvedor de Software há mais de 7 anos, Bruno Guilherme Ody atualmente atua em Cachoeirinha e Canoas no RS,
                onde colhe bons frutos de seu desenvolvimento, e tem disponibilidade para freelance home office em empresas
                no Brasil e exterior. Conta com diversas frentes do mundo Web, Aplicações Desktop e Web e Aplicativos Móveis.

              </p>
              <p>
                <b>Contato:
                  <a className="about-developer-email" target="_blank" href="mailto:brunoody@gmail.com" rel="noopener noreferrer"> Brunoody@gmail.com </a>/
                  <a className="about-developer-email" target="_blank" href="https://wa.me/5551991553549" rel="noopener noreferrer"> (51) 99155-3549</a>
                </b>
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
    </div>


  );
}

export default About;