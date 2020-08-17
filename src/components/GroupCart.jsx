import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import productList from '../services/productList';
import '../CSS/GroupCart.css';
import GroupBackToProductsList from './GroupBackToProductsList';
import userchar from '../images/user.svg';
import rubish from '../images/rubish.svg';
import logo from '../images/logo.svg';
import { chooseEvent } from '../actions/index';

export function finalValue(cartItems) {
  return cartItems.reduce((sum, e) => sum + productList.filter((el) => el.id === Number(e.id))[0].originalPrice * e.total, 0);
}

function decrement(id, props) {
  const { event, chooseEvent } = props;
  const updateProducts = event.products.reduce((acc, p) => {
    if (parseInt(p.id) === parseInt(id) && p.qnt > 0) {
      acc.push({ ...p, qnt: p.qnt - 1 });
    } else {
      acc.push(p);
    }
    return acc;
  }, []);
  chooseEvent({ ...event, products: updateProducts });
}

function increment(id, props) {
  const { event, chooseEvent } = props;
  const updateProducts = event.products.reduce((acc, p) => {
    if (parseInt(p.id) === parseInt(id)) {
      acc.push({ ...p, qnt: p.qnt + 1 });
    } else {
      acc.push(p);
    }
    return acc;
  }, []);
  chooseEvent({ ...event, products: updateProducts });
}

function renderIncrementButton(id, props) {
  return (
    <div className="increment-buttons-cart">
      <button type="button" onClick={() => { decrement(id, props); }}>-</button>
      <button type="button" onClick={() => { increment(id, props); }}>+</button>
    </div>
  );
}

function renderFinalValues(props) {
  const { event } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  const totalValue = event.products.reduce((acc, p) => {
    const product = productList.filter((el) => el.id === Number(p.id));
    if (p.user.log === user.log) {
      return acc += parseInt((p.qnt * product[0].originalPrice).toFixed(2));
    }
    return acc;
  }, 0);
  return (
    <div className="final-price">
      <div className="price">
        <p>Valor Total Individual:</p>
        <p>{`R$${(totalValue)}`}</p>
      </div>
      <div className="price">
        <p>Frete</p>
        <p>R$5.00</p>
      </div>
      <div className="price">
        <p>Total</p>
        <p>{`R$${totalValue + 5}`}</p>
      </div>
    </div>
  );
}

function deleteProduct(product, props) {
  const { event, chooseEvent } = props;
  const newCart = event.products.reduce((acc, p) => {
    if (parseInt(p.id) !== parseInt(product.id)) {
      acc.push(p);
    }
    return acc;
  }, []);
  chooseEvent({ ...event, products: newCart });
}

function renderOthersCart(props, open, setOpen) {
  const { event } = props;
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <div className="icon-text-cart-div">
        {open && <FontAwesomeIcon icon={faAngleUp} onClick={() => setOpen(false)} size="1x" />}
        {!open && <FontAwesomeIcon icon={faAngleDown} onClick={() => setOpen(true)} size="1x" />}
        <h3>Produtos de Outros Participantes</h3>
      </div>
      {open && (
        <div className="products">
          {event.products.map((e) => {
            const product = productList.filter((el) => el.id === Number(e.id));
            if (e.user.log !== user.log) {
              return (
                <div className="others-product">
                  <div>
                    <img src={product[0].thumbnail} width="50px" alt="" />
                    <p>{product[0].productName}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

function renderCartItensSection(props) {
  const { event } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="products">
      {event.products.map((e) => {
        const product = productList.filter((el) => el.id === Number(e.id));
        if (e.user.log === user.log) {
          return (
            <div className="products-cart-list">
              <div>
                <img src={product[0].thumbnail} width="50px" alt="" />
                <p>{product[0].productName}</p>
              </div>
              <div className="product-cart-info">
                <p>{`${e.qnt} X R$${product[0].originalPrice}`}</p>
                <p>{`Total: R$${(e.qnt * product[0].originalPrice).toFixed(2)}`}</p>
                {renderIncrementButton(e.id, props)}
              </div>
              <button onClick={() => { deleteProduct(e, props); }} type="button"><img src={rubish} alt="" /></button>
            </div>
          );
        }
      })}
    </div>
  );
}

function changeDates(deliveryTime, pickupDate, pickupTime, props) {
  const { event, chooseEvent } = props;
  const updateEvent = { ...event, delivery: { date: event.date, time: deliveryTime }, pickup: { date: pickupDate, time: pickupTime } };

  chooseEvent(updateEvent);
}

function GroupCart(props) {
  const { event } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  const [deliveryTime, setDeliveryTime] = useState(event.delivery.time);
  const [pickupDate, setPickupDate] = useState(event.pickup.date);
  const [pickupTime, setPickupTime] = useState(event.pickup.time);
  const [open, setOpen] = useState(false);

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
      <div className="products-page-nav">
        <Link to="mainPurchase"><div><img src={logo} alt="" width="100px" /></div></Link>
        <h1>Carrinho</h1>
        <div />
      </div>
      {(event.products.length === 0) && <div className="container"><p>Nenhum produto adicionado</p></div>}
      {(event.products.length !== 0) && (
        <div className="container">
          {renderCartItensSection(props)}
          {renderOthersCart(props, open, setOpen)}
          {renderFinalValues(props)}
          {user.log === event.owner.log
            && (
              <div className="date-time-div">
                <div>
                  <label htmlFor="delivery-date">Agende a Entrega:</label>
                  <div id="delivery-date">
                    <input type="date" value={event.date} disabled />
                    <input type="time" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="pickup-date">Agende a Busca das Embalagens:</label>
                  <div id="pickup-date">
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                    <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
                  </div>
                </div>
              </div>
            )}
          {user.log === event.owner.log && <Link to="group-finish-order"><button className="finish-order" disabled={(event.products.length === 0)} type="button" onClick={() => changeDates(deliveryTime, pickupDate, pickupTime, props)}>Finalizar Pedido</button></Link>}
        </div>
      )}
      <div className="footer">
        <GroupBackToProductsList />
        <Link to={`/event-page/${event.id}`}><h3>{event.name}</h3></Link>
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  event: state.eventReducer.event,
});

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupCart);
