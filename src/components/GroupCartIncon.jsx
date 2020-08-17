import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cart from '../images/cart.svg';

function GroupCartIncon(props) {
  const { event } = props;
  return (
    <div className="cart-img">
      <p>{event.products.length}</p>
      <Link to="/group-cart"><img src={cart} alt="cart" width="30px" /></Link>
    </div>
  )
}

const mapStateToPros = (state) => ({
  event: state.eventReducer.event,
});

export default connect(mapStateToPros)(GroupCartIncon);
