import React from 'react';
import ReactGA from 'react-ga';
import IsMobile from '../tools/IsMobile';
import './Menu.css';

import site from '../images/social/Site.png';
import instagram from '../images/social/Instagram.png';
import facebook from '../images/social/Facebook.png';
import twitter from '../images/social/Twitter.png';
import youtube from '../images/social/Youtube.png';
import discord from '../images/social/Discord.png';
import sobre from '../images/social/Sobre.png';

function Menu(props) {

  const localTheme = window.localStorage.getItem("sevengalaxies@theme");
  // var ReactGA = require('react-ga');

  ReactGA.modalview('Menu');
  ReactGA.event({
    category: 'Navegação',
    action: 'Menu',
    label: 'Visualizou Menu'
  });

  return (
    <div className={`menu ${localTheme}-menu`} >
      <div className="menu-container">


        <p>Menu</p>

        <ReactGA.OutboundLink
          className="menu-button b1 bt-news"
          eventLabel="Nova Coleção"
          to="https://www.catarse.me/sevengalaxies"
          target="_blank"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          NOVA COLEÇÃO
        </ReactGA.OutboundLink>

        <div className="menu-button b2" onClick={() => props.handleOption('novo')}>
          NOVA BATALHA
        </div>
        <div className="menu-button b3" onClick={() => props.handleOption('tema')}>
          ALTERAR TEMA
        </div>
        <div className="menu-button b3" onClick={() => props.handleOption('deckBuilder')}>
          MEUS DECKS
        </div>

        <ReactGA.OutboundLink
          className="menu-button b4"
          eventLabel="Manual de Regras"
          to="https://sevengalaxiestcg.com/manual"
          target={!IsMobile() || navigator.userAgent.match(/iP/i) ? "_blank" : undefined}
        >
          MANUAL DE REGRAS
        </ReactGA.OutboundLink>

        <div className="menu-button b3" onClick={() => props.handleOption('cards')}>
          CARDS
        </div>

        <ReactGA.OutboundLink
          className="menu-button b6"
          eventLabel="Blog"
          to="https://sevengalaxiestcg.com/blog"
          target="_blank"
        >
          BLOG
        </ReactGA.OutboundLink>

        <ReactGA.OutboundLink
          className="menu-button b7"
          eventLabel="Loja Virtual"
          to="https://loja.7guniverse.com/"
          target="_blank"
        >
          LOJA VIRTUAL
        </ReactGA.OutboundLink>
        {/* <div className="menu-button b3" onClick={() => props.handleOption('tema')}>
          MANUAL DE REGRAS */}

        {/* <iframe title="teste" src={regras} frameborder="0"></iframe> */}
        {/* </div> */}
        {/* <div className="menu-button b8" onClick={() => props.handleOption('sobre')}>
          SOBRE
        </div> */}

        <div className="menu-social">
          <a target="_blank" href="https://sevengalaxiestcg.com/" rel="noopener noreferrer">
            <img src={site} alt="Site" />
          </a>

          <a target="_blank" href="https://www.instagram.com/sevengalaxiestcg" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>

          {/* <a target="_blank" href="https://www.facebook.com/sevengalaxiestcg" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a> */}

          <a target="_system" href={navigator.userAgent.match(/Android/i) ? "fb://page/313912015628026" : "https://www.facebook.com/313912015628026"} rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>

          {
            //<Link className="theme-block" to={"/app/fb"} >
            // </Link>
            //<img src={twitter} alt="Twitter" onClick={() => { window.open('fb://profile/313912015628026', '_system'); props.handleOption('sobre'); }} />
          }

          <a target="_blank" href="https://www.twitter.com/7galaxiestcg" rel="noopener noreferrer">
            <img src={twitter} alt="Twitter" />
          </a>
          <a target="_blank" href="https://www.youtube.com/sevengalaxiestcg" rel="noopener noreferrer">
            <img src={youtube} alt="Youtube" />
          </a>
          <a target="_blank" href="https://discord.gg/wyRJYB9" rel="noopener noreferrer">
            <img src={discord} alt="Discord" />
          </a>
        </div>

        <div className="menu-sobre" onClick={() => props.handleOption('sobre')}>
          <img src={sobre} alt="Sobre" />
          <div>Sobre</div>
        </div>

      </div>
    </div >
  )
}

export default Menu;