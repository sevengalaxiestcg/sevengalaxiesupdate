import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Game from './pages/Game';
import SelectTheme from './pages/SelectTheme/SelectTheme2';
import DeckBuilder from './pages/DeckBuilder';

export default function Routes() {

  useEffect(() => {
    window.history.pushState("nohb", null, "");
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app/game" exact component={Game} />
        {/* 
        <Route path='/app/fb' component={() => {
          window.location.href = 'https://facebook.com/sevengalaxiestcg';
          return null;
        }} /> */}

        <Route path="/app/deckBuilder" exact component={DeckBuilder} />
        {/**/}
        
        <Route path="/app"
          render={(props) => (
            <SelectTheme escolheTheme={true} modal={false} />)}
        // component={SelectTheme()} 
        />
        {/* <Route path="/app/" exact component={Menu}/> */}
        {/* <Route path="/app/Game" component={Game}/> */}
      </Switch>
    </BrowserRouter>

  )



}
