import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import EventChoice from './components/EventChoice';
import CreateEvent from './components/CreateEvent';
import EventPage from './components/EventPage';
import EventConfirmation from './components/EventConfirmation';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Collect from './components/Collect';
import Confirm from './components/Confirm';
import FirstPart from './components/Register/FirstPart';
import SecondPart from './components/Register/SecondPart';
import ThirdPart from './components/Register/ThirdPart';
import MainPurchase from './components/MainPurchase';
import Login from './components/Login';
import Perfil from './components/Perfil';
import GroupProductsPage from './components/GroupProductsPage';
import GroupProductsDetails from './components/GroupProductDetails';
import GroupCart from './components/GroupCart';
import GroupFinishOrder from './components/GroupFinishOrder';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/aig-grupo5-fab">
      <Switch>
        <Route exact path="/products-list" component={ProductsPage} />
        <Route exact path="/event-choice" component={EventChoice} />
        <Route exact path="/create-event" component={CreateEvent} />
        <Route exact path="/event-page/:id" component={EventPage} />
        <Route exact path="/event-confirmation" component={EventConfirmation} />
        <Route exact path="/productdetails/:id" render={(props) => <ProductDetails props={props} />} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/collect" component={Collect} />
        <Route exact path="/confirm" component={Confirm} />
        <Route exact path="/Register" component={FirstPart} />
        <Route exact path="/RegisterAdress" component={SecondPart} />
        <Route exact path="/RegisterCard" component={ThirdPart} />
        <Route exact path="/Perfil" component={Perfil} />
        <Route exact path="/mainPurchase" component={MainPurchase} />
        <Route exact path="/" component={Login} />
        <Route exact path="/group-products-list" component={GroupProductsPage} />
        <Route exact path="/group-products-details/:id" render={(props) => <GroupProductsDetails props={props} />} />
        <Route exact path="/group-cart" component={GroupCart} />
        <Route exact path="/group-finish-order" component={GroupFinishOrder} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
