import { createGlobalStyle } from "styled-components";

// import img from './images/treta-big.png';

let maxHeightContent = '129vmin';
let maxHeightContentDeckList = '156vmin';
if (window.innerWidth > window.innerHeight) {
  maxHeightContent = '56vmin';
  maxHeightContentDeckList = '83vmin';
}

export default createGlobalStyle`
  *,
  *::after,
  *::before {
    
  }

  body {
    /* background-image: ${({ theme }) => theme.background_image}; fd*/
    /* transition: background-image 2s linear; */
    /* transition: 3s;dd */

  }

  *{
    --cor-thema: ${({ theme }) => theme.primary};
    --cor-texto-tema: ${({ theme }) => theme.text_color};
    --filter-tema: ${({ theme }) => theme.filter};
    --max-height-content: ${maxHeightContent};
    --max-height-content-deckList: ${maxHeightContentDeckList};
    --filter-icone-tema: ${({ theme }) => theme.filterIcone}
  }

  button, .rodada-button, .rodada-button-new, .menu-button, .gameover-button {
    background-color: ${({ theme }) => theme.background_color};
    box-shadow: 2px 3px 8px rgba(0, 0, 0, .3), inset 0 0 13px ${({ theme }) => theme.box_shadow_insent};
    border: solid 1px ${({ theme }) => theme.border};
    background-image: linear-gradient(to top, rgba(0, 0, 0, .1), rgba(255, 255, 255, .1));
    color: #fff;

    transition: all 0.25s linear;
    /* font-family: 'Open Sans', sans-serif; */
    text-rendering: optimizeLegibility;
  }

  .checked, .compra-ok{
    color: var(--cor-thema);
  }
  .burger-menu .bar1, .bar2, .bar3{
    background-color: var(--cor-thema);
  }

  .menu-button{
    background-color: ${({ theme }) => theme.background_color_transp}
  }  

  @keyframes dropshadow {
    0% {
      filter: drop-shadow(0 0 0px var(--cor-thema));
    }
    75% {
      filter: drop-shadow(0 0 4px var(--cor-thema));
    }
    100% {
      filter: drop-shadow(0 0 2px var(--cor-thema));
    }
  
  }

  @keyframes color-on-off {
    0% {
      color: ${({ theme }) => theme.primary};
    }
    75% {
      color: rgba(0,0,0,0);
    }
    100% {
      color: ${({ theme }) => theme.primary};
    }
  }
  
  @keyframes color-on {
    0% {
      color: rgba(0,0,0,0);
    }
    60% {
      color: ${({ theme }) => theme.primary};
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes impact {
    0%{
      opacity: 0;
    }
    66% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }


`;
