import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './pages/Home';
import {Header, Footer, RedirectWhenLogin, RedirectWhenLogout} from './pages/Base';
import { Pokemon, PokemonDetail } from './pages/Pokemon';
import { Auth } from './pages/Auth'
import { PAGE_PATHS } from './constants';
import {BoardList, BoardWrite, BoardModify} from './pages/Board';

const App: React.FC = () => {
  
  return (
      <Router>
        <Header />
        <Route exact path={PAGE_PATHS.HOME} component={Home}/>
        <Switch>
          <Route path={`${PAGE_PATHS.POKEDEX}/detail/:id`} component={PokemonDetail}/>
          <Route path={PAGE_PATHS.POKEDEX} component={Pokemon}/>
          <RedirectWhenLogin path={PAGE_PATHS.AUTH} component={Auth} redirectTo={PAGE_PATHS.HOME}/>
          <RedirectWhenLogout path={PAGE_PATHS.BOARDWRITE} component={BoardWrite} redirectTo={PAGE_PATHS.LOGIN}/>
          <RedirectWhenLogout path={PAGE_PATHS.BOARDMODIFY} component={BoardModify} redirectTo={PAGE_PATHS.LOGIN}/>
          <Route path={PAGE_PATHS.BOARD} component={BoardList}/>
        </Switch>
        <Footer/>
      </Router>
  );
}

export default App;
