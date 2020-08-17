import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import packageList from '../services/packageList';
import {
  switchPackage, decreaseToCart, increaseToCart, removeFromCart, changeInput, selectFee, selectDelivery, selectCollect,
} from '../actions/index';
import '../CSS/Cart.css';
import BackToProductsList from './BackToProductsList';
import { updateLocalStorage } from '../store';
import user from '../images/user.svg';
import rubish from '../images/rubish.svg';
import logo from '../images/logo.svg';

export function calculateDiscount(packageTotal) {
  return packageTotal.reduce((sum, e) => sum + packageList.filter((el) => e.id === el.id)[0].price * e.total, 0);
}

export function calculatePlasticSaved(packageTotal) {
  return packageTotal.reduce((sum, e) => sum + (packageList.filter((el) => e.id === el.id))[0].weight * e.total, 0);
}

export function finalValue(cartItems) {
  return cartItems.reduce((sum, e) => sum + productList.filter((el) => el.id === Number(e.id))[0].originalPrice * e.total, 0);
}

function renderIncrementButton(id, props) {
  const {
    decrement, increment,
  } = props;
  return (
    <div>
      <div className="increment-buttons">
        <button type="button" onClick={() => { decrement(id); updateLocalStorage(); }}>-</button>
        <button type="button" onClick={() => { increment(id); updateLocalStorage(); }}>+</button>
      </div>
    </div>
  );
}

function renderPackageSection(packageTotal, changeInput) {
  return (
    <div>
      <div className="package-container">
        <p>Deseja retornar Embalagens?</p>
        <div className="input-label">
          <p>Embalagem de 2L</p>
          <input onChange={(e) => changeInput(1, e.target.value)} type="number" value={packageTotal.filter((e) => e.id === 1)[0].total} />
        </div>
        <div className="input-label">
          <p>Embalagem de 1L</p>
          <input onChange={(e) => changeInput(2, e.target.value)} type="number" value={packageTotal.filter((e) => e.id === 2)[0].total} />
        </div>
        <div className="input-label">
          <p>Embalagem de 0.5L</p>
          <input onChange={(e) => changeInput(3, e.target.value)} type="number" value={packageTotal.filter((e) => e.id === 3)[0].total} />
        </div>
      </div>
    </div>
  );
}

function renderFinalValues(finalPrice, discount, isDelivery, purchaseTotal) {
  let deliveryFee;
  if (isDelivery) { deliveryFee = 3; } else { deliveryFee = 0; }
  return (
    <div className="final-price">
      <div className="price">
        <p>Valor Final da Compra:</p>
        <p>{`R$${(purchaseTotal)}`}</p>
      </div>
      <div className="price">
        <p>Devolução de Embalagens:</p>
        <p>{`R$${discount}`}</p>
      </div>
      <div className="price">
        <p>Frete</p>
        <p>{`R$${isDelivery ? deliveryFee.toFixed(2) : '0.00'}`}</p>
      </div>
      <div className="price">
        <p>Total</p>
        <p>{`R$${(purchaseTotal - discount + deliveryFee).toFixed(2)}`}</p>
      </div>
      {((purchaseTotal - discount + deliveryFee) < 0) && <p style={{ textAlign: 'center', color: 'red' }}>Valor da Compra não pode ser negativo. Adicione mais produtos para retornar suas embalagens</p>}
    </div>
  );
}

function renderCollectionOptions(changeToDelivery, changeToCollect) {
  return (
    <div className="collection-options">
      <p>Retirada do Produto</p>
      <button type="button" onClick={() => changeToDelivery()}>Delivery</button>
      <button type="button" onClick={() => changeToCollect()}>Retirada</button>
    </div>
  );
}

function renderCartItensSection(items, props) {
  const { deleteProduct } = props;
  return (
    <div className="products">
      {items[0].cart.map((e) => {
        const product = productList.filter((el) => el.id === Number(e.id));
        return (
          <div className="products-cart-list">
            <div>
              <img src={product[0].thumbnail} width="50px" alt="" />
              <p>{product[0].productName}</p>
            </div>
            <div className="product-cart-info">
              <p>{`${e.total} X R$${product[0].originalPrice}`}</p>
              <p>{`Total: R$${(e.total * product[0].originalPrice).toFixed(2)}`}</p>
              {renderIncrementButton(e.id, props)}
            </div>
            <button onClick={() => { deleteProduct(e.id); updateLocalStorage(); }} type="button"><img src={rubish} alt="" /></button>
          </div>
        );
      })}
    </div>
  );
}

function Cart(props) {
  const {
    packageTotal, changeInput, changeToDelivery, changeToCollect, isDelivery,
  } = props;
  const items = JSON.parse(localStorage.getItem('temporaryStorage')) || [];
  const purchaseTotal = finalValue(items[0].cart).toFixed(2);
  const discount = calculateDiscount(packageTotal).toFixed(2);
  const finalPrice = purchaseTotal - discount;
  return (
    <div>
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
        <h1>Carrinho</h1>
        <div />
      </div>
      <div className="container">
        {(items[0].cart.length < 1) && <p className="p-container">Nenhum produto adicionado</p>}
        {renderCartItensSection(items, props)}
        {(items[0].cart.length > 0) && renderPackageSection(packageTotal, changeInput)}
        {(items[0].cart.length > 0) && renderCollectionOptions(changeToDelivery, changeToCollect)}
        {renderFinalValues(finalPrice, discount, isDelivery, purchaseTotal)}
        {isDelivery
          ? <Link to="/payment"><button className="finish-order" disabled={((finalPrice < 0.01))} type="button">Finalizar Pedido</button></Link>
          : <Link to="/collect"><button className="finish-order" type="button">Finalizar Pedido</button></Link>}
      </div>
      <div className="footer">
        <BackToProductsList />
        <Link to="/Perfil"><img src={user} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  initialState: state.FinalCartReducer,
  cartItems: state.FinalCartReducer,
  packageTotal: state.PackageReducer,
  isDelivery: state.CollectionReducer.isDelivery,
});

const mapDispatchToProps = (dispatch) => ({
  alterPackage: (id, e) => dispatch(switchPackage(id, e)),
  decrement: (id) => dispatch(decreaseToCart(id)),
  increment: (id) => dispatch(increaseToCart(id)),
  deleteProduct: (id) => dispatch(removeFromCart(id)),
  changeInput: (id, total) => dispatch(changeInput(id, total)),
  changeToDelivery: () => dispatch(selectDelivery()),
  changeToCollect: () => dispatch(selectCollect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
