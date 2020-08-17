import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import FirstPart from './pages/Register/FirstPart';
import SecondPart from './pages/Register/SecondPart';
import ThirdPart from './pages/Register/ThirdPart';
import MainPurchase from './pages/MainPurchase';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import MainEventRegister from './pages/EventRegister/MainEventRegister';
import EventRegisterTerms from './pages/EventRegister/EventRegisterTerms';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/Register" component={FirstPart} />
          <Route exact path="/RegisterAdress" component={SecondPart} />
          <Route exact path="/RegisterCard" component={ThirdPart} />
          <Route exact path="/Perfil" component={Perfil} />
          <Route exact path="/mainPurchase" component={MainPurchase} />
          <Route exact path="/eventRegister" component={MainEventRegister} />
          <Route exact path="/eventTerms" component={EventRegisterTerms} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
