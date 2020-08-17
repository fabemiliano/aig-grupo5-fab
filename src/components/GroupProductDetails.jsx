import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import {
  decrease, increase, chooseEvent, sendToCart,
} from '../actions/index';
import '../CSS/ProductDetails.css';
import '../CSS/Footer.css';
import GroupBackToProductsList from './GroupBackToProductsList';
import userchar from '../images/user.svg';
import logo from '../images/logo.svg';
import GroupCartIcon from './GroupCartIncon';

function addToCart(id, qnt, props) {
  const { event, chooseEvent, sendToCart } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  const answer = event.products.some((product) => parseInt(product.id) === parseInt(id) && product.user === user);
  if (answer) {
    const newCart = event.products.reduce((acc, product) => {
      if (parseInt(product.id) === parseInt(id) && product.user === user) {
        acc.push({
          id,
          qnt: product.qnt + qnt,
          user,
        });
        return acc;
      }
      acc.push(product);
      return acc;
    }, []);
    chooseEvent({ ...event, products: newCart });
  } else {
    chooseEvent({ ...event, products: [...event.products, { id, qnt, user }] });
  }
  sendToCart(id, qnt);
}

function renderIncrementButton(id, props) {
  const {
    initialState, decrement, increment, detailsInitialState,
  } = props;
  let total;
  if (initialState.some((e) => e.id === Number(id))) {
    total = initialState.filter((e) => e.id === Number(id))[0].total;
  } else { total = 0; }
  const detailsTotal = detailsInitialState.filter((e) => e.id === Number(id))[0].amount;
  return (
    <div className="add-to-cart">
      <div className="increment-div">
        <p>{`Você possui ${total} unidades desse produto em seu carrinho`}</p>
        <div className="increment-buttons">
          <button type="button" onClick={() => decrement(id)}>-</button>
          <p>{detailsTotal}</p>
          <button type="button" onClick={() => increment(id)}>+</button>
        </div>
      </div>
      <button type="button" onClick={() => { addToCart(Number(id), detailsTotal, props); }} disabled={!((detailsTotal > 0))}>Adicionar ao Carrinho</button>
    </div>
  );
}

function GroupProductDetails(props) {
  const { props: { match: { params: { id } } } } = props;
  const cartState = (JSON.parse(localStorage.getItem('temporaryStorage')))[0].cart;
  const product = productList.filter((e) => e.id === Number(id));
  const { event } = props;

  useEffect(() => () => {
    const currentEvents = JSON.parse(localStorage.getItem('storedEvents'));
    const newEvents = currentEvents.reduce((acc, e) => {
      if (e.id !== event.id) {
        acc.push(e);
      } else {
        acc.push(event);
      }
      return acc;
    }, []);
    localStorage.setItem('storedEvents', JSON.stringify(newEvents));
  });

  return (
    <div>
      <div>
        <div className="products-page-nav">
          <div><img src={logo} alt="" width="100px" /></div>
          <GroupCartIcon />
        </div>
        <div className="container">
          <div className="products-list">
            <img src={product[0].thumbnail} width="300px" alt="" />
            <h3>{product[0].productName}</h3>
            <p>{`R$ ${product[0].originalPrice}`}</p>
            <p>Com a embalagem retornável você paga:</p>
            <p>{`R$ ${product[0].discountPrice}`}</p>
          </div>
          {renderIncrementButton(id, props)}
        </div>
      </div>
      <div className="footer">
        <GroupBackToProductsList />
        <Link to={`/event-page/${event.id}`}><h3>{event.name}</h3></Link>
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToPros = (state) => ({
  initialState: state.FinalCartReducer,
  detailsInitialState: state.CartReducer,
  cartState: state.FinalCartReducer,
  event: state.eventReducer.event,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: (id) => dispatch(decrease(id)),
  increment: (id) => dispatch(increase(id)),
  chooseEvent: (e) => dispatch(chooseEvent(e)),
  sendToCart: (id, total) => dispatch(sendToCart(id, total)),
});

export default connect(mapStateToPros, mapDispatchToProps)(GroupProductDetails);
