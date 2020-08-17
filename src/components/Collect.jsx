import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateDiscount, finalValue } from './Cart';
import '../CSS/Payment.css';
import { purchaseFinished } from '../store';
import BackToProductsList from './BackToProductsList';
import user from '../images/user.svg';
import MapComponent from './MapComponent';
import logo from '../images/logo.svg';

function getCardInfo(setName, setNumber, setDate, setCvv) {
  const userid = JSON.parse(localStorage.getItem('user')).log;
  const storage = JSON.parse(localStorage.getItem('dataToPurchase')).filter(e => e.email === userid)[0];
  setName(storage.card.cardHolder); setNumber(storage.card.number); setDate(storage.card.dueDate); setCvv(storage.card.cvv);
}

function Payment(props) {
  const { packageTotal, isDelivery } = props;
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [date, setDate] = useState('');
  const items = JSON.parse(localStorage.getItem('temporaryStorage'))[0].cart;
  const discount = calculateDiscount(packageTotal);
  let deliverfee;
  if (isDelivery) { deliverfee = 3; } else { deliverfee = 0; }
  return (
    <div>
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
        <h1>Pagamento</h1>
        <div />
      </div>
      <div className="container">
        <div>
          <div className="collection-container">
            <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>Detalhes do Pagamento</h2>
            <div className="price">
              <p>Valor a pagar </p>
              <p>{`${(finalValue(items) - discount + deliverfee).toFixed(2)}`}</p>
            </div>
            <p style={{ fontWeight: 900 }}>Dados do Cartão</p>
            <div className="card-field">
              <input type="text" placeholder="nome do comprador" onChange={(e) => setName(e.target.value)} value={name} />
              <input type="number" placeholder="numero do cartao" onChange={(e) => setNumber(e.target.value)} value={number} />
              <div className="card-details">
                <input type="month" min="2020-08" placeholder="data de vencimento" onChange={(e) => setDate(e.target.value)} value={date} />
                <input type="text" placeholder="cvv" onChange={(e) => setCvv(e.target.value)} value={cvv} />
              </div>
            </div>
          </div>
        </div>
        <div className="payment-btns">
          <button type="button" onClick={() => getCardInfo(setName, setNumber, setDate, setCvv)}>Usar dados de cadastro</button>
          <Link to="/confirm"><button onClick={() => { purchaseFinished(); }} type="button">Finalizar Compra</button></Link>
        </div>
      </div>
      <div>
        <p>Encontre o ponto de coleta mais próximo de você</p>
        <MapComponent />
      </div>
      <div className="footer">
        <BackToProductsList />
        <Link to="/Perfil"><img src={user} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.FinalCartReducer,
  packageTotal: state.PackageReducer,
  isDelivery: state.CollectionReducer.isDelivery,
});

export default connect(mapStateToProps)(Payment);
