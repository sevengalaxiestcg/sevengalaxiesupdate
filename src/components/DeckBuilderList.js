import React, { forwardRef, useImperativeHandle } from 'react';
import { DeckBuilderViewStates } from '../models/DeckBuilderViewStates';
import { Deck, Galaxies } from '../models/CardsInfos';

import iconSearch from '../images/lupa.png';
import iconOrdenar from '../images/ordenar.png';
import iconPlus from '../images/+.png';
import iconMinus from '../images/_.png';

import iconGaia from '../images/pedras/Gaia.png';
import iconStroj from '../images/pedras/Stroj.png';
import iconMajik from '../images/pedras/Majik.png';
import iconAdroit from '../images/pedras/Adroit.png';
import icon3 from '../images/pedras/3-2.png';
import icon2 from '../images/pedras/2-2.png';
import icon1 from '../images/pedras/1-2.png';

const iconAccept = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRpwZ27bEMuQAWmUz8t4886H6pgcFY2IZikQ&usqp=CAU";
const iconEdit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD////h4eH39/eUlJT8/PxwcHCRkZHd3d3Z2dmurq47OzvT09Pv7++np6cWFhacnJx3d3c/Pz/FxcW+vr5ISEgrKytPT08zMzMkJCTm5uYbGxshISG3t7cTExOLi4tlZWVXV1eBgYFpaWlcXFzMzMwLCwuEhIR1gTfKAAAFHUlEQVR4nO2daVfyMBCFE2pZREpFxZVX3P//P3wpLXbJJE1yWsPNmeeTR/gw92jJ5M6CkE3m2fThnwDm+2UzzeYtTaL+MckfQwc4EOtZQim8CB3XoFwoCifb0DENzHrRVrgLHdAI7JoKL0NHMwqXtcLb0LGMxO6kcBI6ktGYVApfQgcyGttSYVzHRJu8UJiGjmJU0oPCPHQQo5IdFMb7FBZspZiHjmFkJiILHcLIXIrr0CGMzLtYhg5hZO4F9IXXgljuvHq+QwfAMAzDMAzDMAzDMAzDMAzDMAzDMAzDRMsm7saJ7U3RD3p1HzqO0bg/9Z7PQkcyEnf1AEGcfVrL5hRIjH3nD2lr0CW+2YHHtsD4mutfEtnlK3RMg7JWBR5OjdBRDcmKECjlInRYw0ELjGgO5EkjUMqn0KENw0QrUMpVDL2TM4PAg8Tn0PENQGaUmMQwF5kbJaYx3KcujBLlJnR8A/BqlhjDhfHHLPEtdHwDcG2WuA8d3wBMzRKnoeMbgH38Ej/NEtGym3yl/u7NqBBslndGppz3JoVY18Xj4bBSZ8ruDAqhrlLvZcyJOla27No1NUj34d+DgZJI+RlHgAzGjzrqVE05/+kk3gUI1Y/2oaBKfKY9DRx38a0TOZFVUxJxnkL1QCCyatW4wfkg3RB/nr36tq5EHEeKPgw+1De23Ski/zlTlOJEBZFVNxeSEanBmfKoPeve1Tdf/b6YwAgUWoFS/qjvPklMYcy2b513f4S4OXyVrzz8faie6L37I8SWnGPfAk4q0yOQrN3fItlspuJEBZFa3+7/PFBf5v0CsWv3V/3yCnCy6y5fdgKlvAkdqSc3tgJR2xNu7QWi+U0lOxeBiBIv3QQi3XVLzAVeEpzbboG5vKuTCGTgm7sQtOD0l/bUPXXgdJe++wnEsX57ap74Aj/6xVDgpN89JV0dOJnpm59AnLzUWOvUg5OyUda2BTjrcJf9Yihw0rWtvpBrAqc4obe2jeAUJ8i+ewuBMOm22drWkqxDB26Np0Ccbb+91jZJilOcsLC2KXAana2sbRWc6suiXwwFTvXF0rvv8hk6bmscrO0m+9BxW+MpEKf319n5LcH5ZgZPgUQTxpniYW0XvIaO2xovaxupddtTIM6XFHl69zjGaM9Ajw4cY9TzIETqSvC60+M4v57OIY7zK3oHQElwnN8C62aZGrBSvbs5iuP8HnGvUOA4vyXO+QyO81vh6lzACRT9mloAOb8VjqXeBG/NhdvFEMj5/cXNAgYUuHYSiOP81jj1zOA4vw1cmkcxl1s41NJwrO0mz/YCiRE8BOx783Cc3zbWTeo4zm8H28cQpyW2w0PsAvvWO53AcX4V7HxEnKZmFSsDA8faVjHtWvkFyNpWsfERkaxtld7OhKcM8TbRwPwYTnLA22Ab02M4v4CXJwyP4eIVppPSDG3nL17xzCYdRFVtMYtHHtGufvUTkzzRKW6nN7D3Iz1ZQx7q/dZM9UGTAm12cKTwgpMdpr9kxypueQci++BkGIZhGIZhGIZhGIZhGIZhGIZhGIZhmLMA57uG/FgLnG1wfmxEnP1MNdcCeVjAhkyArXBwZiIk3Py4Ey9SAO2j8iE/KExCBzEq6UEh8uRVL7ksFEqY799zZitLhWALYxyYVAqxx68MHKd4y+UkcR775brKav0K9owZTTWHfVowM4+t5/fxtLa5XqET18lfb3dqLAlK81gSuPWsMbLUXoO0yK832P+u38tp1l4r/h/jhC+UpNgAyAAAAABJRU5ErkJggg==";
const iconExport = "https://e7.pngegg.com/pngimages/382/1010/png-clipart-computer-icons-export-export-miscellaneous-cdr-thumbnail.png";
const iconImport = "https://banner2.cleanpng.com/20180430/aqe/kisspng-computer-icons-import-export-download-imports-5ae7ad6fd4dff5.9747302515251326558719.jpg";

export class DeckBuilderDecksListHeader extends React.Component {

  SendToCreateNewDeck() {
    let newDeck = new Deck();
    newDeck.name = "Novo Deck";
    newDeck.thumb = this.props.thumbPadrao;
    newDeck.mainCards = [];
    newDeck.specialCards = [];
    this.props.setCurrDeck(newDeck);

    let deckList = this.props.DeckList;
    deckList.push(newDeck);
    this.props.SetDeckListInSession(deckList);

    this.props.setShowBottomMenu(false);
    this.props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  SearchDeck() {
    const input = document.getElementById("search-deck-input");
    if (input && input.value) {
      this.props.SearchDeck(input.value);
    }
    else {
      this.props.SearchDeck();
    }
  }

  ToggleGalaxyFilterSelected(galaxy) {
    this.props.ToggleGalaxyFilterSelected(galaxy);
    this.SearchDeck();
  }

  ImportDeck() {
    const input = document.createElement("input");
    input.style.display = 'none';
    input.type = 'file';

    const appRoot = document.getElementsByClassName("app")[0];
    appRoot.appendChild(input);

    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = (data) => {
        const base64 = data.target.result.split("base64,")[1];
        const jsonString = atob(base64);
        let newDeck = JSON.parse(jsonString);
        newDeck.mainCards = newDeck.cards.filter(card => !card.specialCard);
        newDeck.specialCards = newDeck.cards.filter(card => card.specialCard);

        let deckList = this.props.DeckList;
        deckList.push(newDeck);
        this.props.SetDeckListInSession(deckList);

        this.props.setCurrDeck(newDeck);
        this.props.setViewState(DeckBuilderViewStates.DeckEdit);
      };
  
      reader.readAsDataURL(file);
    };
    input.click();
  }

  render () {
    return (
      <>
        <div className='deckBuilder-header-block'>
          <div className='title'>
            MEUS DECKS
          </div>
          <div className='header-options'>
            {/* <div className='bt-deckBuilder bt-option'>
              <img alt="Ordenar" src={iconOrdenar}></img>
            </div> */}
            <div className='bt-deckBuilder bt-option' onClick={() => { this.SendToCreateNewDeck() }}>
              <img alt="Adicionar deck" src={iconPlus}></img>
            </div>
            <div className='bt-deckBuilder bt-option' onClick={() => { this.ImportDeck(); }}>
              <img alt="Importar deck" src={iconImport}></img>
            </div>
          </div>
        </div>
        <div className='bt-deckBuilder bt-deckBuilder-search' onClick={() => { this.SearchDeck() }}>
          <input type="text" id="search-deck-input" placeholder='Pesquisar...'></input>
          <img alt="Pesquisar Deck" src={iconSearch}></img>
          {/* <div className={"burger-menu open"} onClick={() => ResetInputSearch()} >
            <div className="bar1" key="b1" />
            <div className="bar2" key="b2" />
            <div className="bar3" key="b3" />
          </div> */}
        </div>
        <div className='deckBuilder-galaxiesContainer'>
          <div className={ this.props.GetGalaxyClass(Galaxies.Gaia) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Gaia) }}>
            <img alt="Gaia" src={iconGaia}></img>
          </div>
          <div className={ this.props.GetGalaxyClass(Galaxies.Majik) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Majik) }}>
            <img alt="Majik" src={iconMajik}></img>
          </div>
          <div className='deckBuilder-galaxiesContainer-item bt-galaxy'>
            <img alt="???1" src={icon2}></img>
          </div>
          <div className='deckBuilder-galaxiesContainer-item bt-galaxy'>
            <img alt="???2" src={icon1} className='img-triangle'></img>
          </div>
          <div className='deckBuilder-galaxiesContainer-item bt-galaxy'>
            <img alt="???3" src={icon3}></img>
          </div>
          <div className={ this.props.GetGalaxyClass(Galaxies.Adroit) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Adroit) }}>
            <img alt="Adroit" src={iconAdroit}></img>
          </div>
          <div className={ this.props.GetGalaxyClass(Galaxies.Stroj) }
            onClick={() => { this.ToggleGalaxyFilterSelected(Galaxies.Stroj) }}>
            <img alt="Stroj" src={iconStroj}></img>
          </div>
        </div>
      </>
    );
  }
}

export class DeckBuilderDecksList extends React.Component {

  ToogleSetIsShowEditDeckName(index) {
    this.props.setIsShowEditDeckName(index);

    setTimeout(() => {
      this.forceUpdate();

      const input = document.getElementById("inputEditDeckName_" + index);
      if (input) {
        const deck = this.props.DeckList[index];
        input.value = deck.name;
        input.focus();
      }
    }, 100);
  }

  AcceptEditDeckName(index) {
    const input = document.getElementById("inputEditDeckName_" + index);
    if (input) {
      const deck = this.props.DeckList[index];
      const name = input.value;
      deck.name = name;
    }
    this.props.setIsShowEditDeckName(-1);
    this.props.SetDeckListInSession(this.props.DeckList);
    this.forceUpdate();
  }

  SendToEditDeck(index) {
    const deck = this.props.DeckList[index];
    deck.cards = deck.cards.sort(function (a, b){
      let strList = [a.name, b.name].sort();
      if (strList[0] === a.name) { return -1; }
      else { return 1; }
    });
    deck.mainCards = deck.cards.filter(card => !card.specialCard);
    deck.specialCards = deck.cards.filter(card => card.specialCard);

    this.props.setCurrDeck(deck);
    this.props.setShowBottomMenu(false);
    this.props.setViewState(DeckBuilderViewStates.DeckEdit);
  }

  DeleteDeck (index) {
    this.props.DeckList.splice(index, 1);
    let deckList = this.props.DeckList;
    this.props.SetDeckListInSession(deckList);
    this.forceUpdate();
  }

  ExportDeck (index) {
    const deck = this.props.DeckList[index];
    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(deck)], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    // file extension ".sgd" ("sgd" stands for "Seven Galaxies Deck")
    link.download = `${deck.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "")}.sgd`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  render() {
    return (
      <>
        {this.props.DeckList.map((deck, i) => 
            <div className='deckBuilder-item' key={i}>
              <div className={this.props.isShowEditDeckName !== i ? "editable" : ""}
                onClick={() => { if(this.props.isShowEditDeckName !== i) this.SendToEditDeck(i) }}
              >
                <img alt="Thumbnail" className='deckBuilder-item-thumb' src={deck.thumb}></img>
              </div>
              {this.props.isShowEditDeckName === i 
                ? <div className='deckBuilder-item-nameBox editBox'>
                    <input type="text" id={'inputEditDeckName_' + i}></input>
                    <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.AcceptEditDeckName(i) }}>
                      <img alt="Confirmar" className='icon-img' src={iconAccept}></img>
                    </div>
                  </div>
                : 
                  <div className='deckBuilder-item-nameBox'>
                    <h4 onClick={() => { this.ToogleSetIsShowEditDeckName(i) }}>{deck.name}</h4>
                    {/* <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.ToogleSetIsShowEditDeckName(i) }}>
                      <img alt="Editar" className='icon-img' src={iconEdit}></img>
                    </div> */}
                    <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.ExportDeck(i) }}>
                      <img alt="Exportar deck" className='icon-img' src={iconExport}></img>
                    </div>
                    <div className='bt-deckBuilder bt-deck-editName' onClick={() => { this.DeleteDeck(i) }}>
                      <img alt="Excluir deck" className='icon-img' src={iconMinus}></img>
                    </div>
                  </div>
              }
            </div>
          )}
      </>
    );
  }
}