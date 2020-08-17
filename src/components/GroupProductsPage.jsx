import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import '../CSS/ProductsPage.css';
import {
  decrease, increase, chooseEvent, sendToCart,
} from '../actions/index';
import userchar from '../images/user.svg';
import logo from '../images/logo.svg';
import GroupCartIcon from './GroupCartIncon';
import GroupBackToProductsList from './GroupBackToProductsList';

let list = productList;

export function getTotalCart(cartState) {
  return cartState.reduce((sum, e) => sum + e.total, 0);
}

function addToCart(id, qnt, props) {
  const { event, chooseEvent, sendToCart } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  const answer = event.products.some((product) => parseInt(product.id) === parseInt(id) && product.user.log === user.log);
  if (answer) {
    const newCart = event.products.reduce((acc, product) => {
      if (parseInt(product.id) === parseInt(id) && product.user.log === user.log) {
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

function renderFilter(selectedFilter, setSelectedFilter) {
  let filters = productList.reduce((arr, e) => {
    if (arr.includes(e.category)) return arr;
    return [...arr, e.category];
  }, []);
  filters = ['Todos', ...filters];
  return (
    <div>
      <p>Filtrar por Tipo</p>
      <select onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>
        {filters.map((e) => <option>{e}</option>)}
      </select>
    </div>
  );
}

function renderAddButtons(id, props, setShowMessage, setPageHeight, setPageWidth) {
  const {
    initialState, decrement, increment,
  } = props;
  const total = initialState.filter((e) => e.id === id)[0].amount;
  return (
    <div className="add-to-cart">
      <div className="increment-buttons">
        <button onClick={() => decrement(id)} type="button">-</button>
        <p>{total}</p>
        <button onClick={() => increment(id)} type="button">+</button>
      </div>
      <button
        type="button"
        disabled={!((total > 0))}
        onClick={(e) => {
          setPageHeight(e.pageY);
          setPageWidth(e.pageX);
          addToCart(id, total, props);
          setShowMessage(() => true);
          setTimeout(() => { setShowMessage(false); }, 1000);
        }}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

function filterProducts(selectedFilter, props, setShowMessage, setPageHeight, setPageWidth) {
  return (
    <div className="products-container">
      {(selectedFilter === 'Todos') && list.map((e) => (
        <div>
          <Link to={`/group-products-details/${e.id}`}>
            <div className="products-list">
              <img src={e.thumbnail} width="100px" alt="" />
              <p>{e.productName}</p>
              <p>{e.originalPrice}</p>
            </div>
          </Link>
          {renderAddButtons(e.id, props, setShowMessage, setPageHeight, setPageWidth)}
        </div>
      ))}
      {(selectedFilter !== 'Todos') && list.filter((e) => e.category === selectedFilter)
        .map((e) => (
          <div>
            <Link to={`/group-products-details/${e.id}`}>
              <div className="products-list">
                <img src={e.thumbnail} width="100px" alt="" />
                <p>{e.productName}</p>
                <p>{e.discountPrice}</p>
              </div>
            </Link>
            {renderAddButtons(e.id, props, setShowMessage, setPageHeight, setPageWidth)}
          </div>
        ))}
    </div>
  );
}

const sorters = ['', 'A -> Z', 'Z -> A', 'Menor Preço', 'Maior Preço'];

function sort(e) {
  switch (e) {
    case '': return productList;
    case 'Menor Preço': return list.sort((a, b) => a.originalPrice - b.originalPrice);
    case 'Maior Preço': return list.sort((a, b) => b.originalPrice - a.originalPrice);
    case 'A -> Z': return list.sort((a, b) => {
      if (a.productName < b.productName) return -1;
      if (b.productName > a.productName) return 1;
      return 0;
    });
    case 'Z -> A': return list.sort((a, b) => {
      if (a.productName > b.productName) return -1;
      if (b.productName < a.productName) return 1;
      return 0;
    });
    default: return list;
  }
}

function renderSortButton(orderBy, setOrderBy) {
  return (
    <div>
      <p>Ordenar Por</p>
      <select onChange={(e) => { setOrderBy(e.target.value); sort(e.target.value); }} value={orderBy}>
        {sorters.map((e) => <option>{e}</option>)}
      </select>
    </div>
  );
}

function changeProductList(e) {
  list = productList;
  list = list.filter((el) => (el.productName.toLocaleLowerCase()).includes(e.toLocaleLowerCase()));
}

function renderSearchInput(searchBy, setSearchBy) {
  return (
    <input placeholder="Pesquisar Produto" onChange={(e) => { setSearchBy(e.target.value); changeProductList(e.target.value); }} value={searchBy} />
  );
}

function GroupProductsPage(props) {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [showMessage, setShowMessage] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [pageHeight, setPageHeight] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
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
    <div className="products-page">
      <div className="products-page-nav">
        <div><img src={logo} alt="" width="100px" /></div>
        {renderSearchInput(searchBy, setSearchBy)}
        <GroupCartIcon />
      </div>
      <div className="container">
        <div className="filter-sorter">
          {renderFilter(selectedFilter, setSelectedFilter)}
          {renderSortButton(orderBy, setOrderBy)}
        </div>
        {showMessage && <p className="added-product" style={{ top: `${pageHeight + 10}px`, left: `${pageWidth - 90}px` }}>Produto Adicionado</p>}
        {filterProducts(selectedFilter, props, setShowMessage, setPageHeight, setPageWidth)}
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
  initialState: state.CartReducer,
  cartState: state.FinalCartReducer,
  event: state.eventReducer.event,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: (id) => dispatch(decrease(id)),
  increment: (id) => dispatch(increase(id)),
  chooseEvent: (e) => dispatch(chooseEvent(e)),
  sendToCart: (id, total) => dispatch(sendToCart(id, total)),
});

export default connect(mapStateToPros, mapDispatchToProps)(GroupProductsPage);
