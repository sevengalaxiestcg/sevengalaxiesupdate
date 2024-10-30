import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Game from './pages/Game';
import SelectTheme from './pages/SelectTheme/SelectTheme2';
import Inicio from './pages/Inicio';
import DeckBuilder from './pages/DeckBuilder';
import CardsLibrary from './pages/Cards';

export default function Routes() {

  useEffect(() => {
    window.history.pushState("nohb", null, "");
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app/inicio" exact component={Inicio} />

        <Route path="/app/game" exact component={Game} />

        <Route path="/app/deckBuilder" exact component={DeckBuilder} />
        {/**/}

        <Route path="/app/cards" exact component={CardsLibrary} />
        {/**/}

        <Route path="/app"
          render={(props) => (
            <SelectTheme escolheTheme={true} modal={false} />
          )}
        />

        {/* 
        <Route path='/app/fb' component={() => {
          window.location.href = 'https://facebook.com/sevengalaxiestcg';
          return null;
        }} /> */}

        {/* <Route path="/app/" exact component={Menu}/> */}
        {/* <Route path="/app/Game" component={Game}/> */}
      </Switch>
    </BrowserRouter>

  )



}
