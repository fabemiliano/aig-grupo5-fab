import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateDiscount, finalValue } from './Cart';
import '../CSS/Payment.css';
import { purchaseFinished } from '../store';
import BackToProductsList from './BackToProductsList';
import user from '../images/user.svg';
import logo from '../images/logo.svg';

let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = `${day} / ${month} / ${year}`;

const finishThePurchaser = (
  addressStreet, addressNumber, addressCity, addressState, purchaseFinished,
) => {
  const getID = JSON.parse(localStorage.getItem('dataToPurchase')) || [];
  const extraData = JSON.parse(localStorage.getItem('extraPurchaseData'));
  const newObj = {
    id: getID.length,
    day: today,
    adress: addressStreet,
    number: addressNumber,
    city: addressCity,
    state: addressState,
  };
  if (extraData === '' || !extraData) {
    localStorage.setItem('extraPurchaseData', JSON.stringify([newObj]));
  } else {
    localStorage.setItem('extraPurchaseData', JSON.stringify([...extraData, newObj]));
  }
  purchaseFinished();
};

function getCardInfo(setName, setNumber, setDate, setCvv) {
  const userid = JSON.parse(localStorage.getItem('user')).log;
  const storage = JSON.parse(localStorage.getItem('dataToPurchase')).filter((e) => e.email === userid)[0];
  setName(storage.card.cardHolder);
  setNumber(storage.card.number);
  setDate(storage.card.dueDate);
  setCvv(storage.card.cvv);
}

function getAddressInfo(
  setAddressCep, setAddressComplement, setAddressNumber,
  setAddressState, setAddressStreet, setAddressCity,
) {
  const userid = JSON.parse(localStorage.getItem('user')).log;
  const storage = JSON.parse(localStorage.getItem('dataToPurchase')).filter((e) => e.email === userid)[0];
  setAddressCep(storage.address.cep);
  setAddressComplement(storage.address.complement);
  setAddressNumber(storage.address.number);
  setAddressState(storage.address.stateLetters);
  setAddressStreet(storage.address.street);
  setAddressCity(storage.address.city);
}

function Payment(props) {
  const { packageTotal, isDelivery } = props;
  const items = JSON.parse(localStorage.getItem('temporaryStorage'))[0].cart;
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [date, setDate] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressComplement, setAddressComplement] = useState('');
  const [addressCep, setAddressCep] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const discount = calculateDiscount(packageTotal);
  let deliverfee;
  if (isDelivery) { deliverfee = 3; } else { deliverfee = 0; }
  console.log(JSON.parse(localStorage.getItem('temporaryStorage')));
  return (
    <div>
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
        <h1>Pagamento</h1>
        <div />
      </div>
      <div className="container">
        <div>
          <div>
            <div className="collection-container">
              <h2>Detalhes do Pagamento</h2>
              <div className="price">
                <p>Valor a pagar </p>
                <p>{`${(finalValue(items) - discount + deliverfee).toFixed(2)}`}</p>
              </div>
              <p>Dados do Cartão</p>
              <div className="card-field">
                <input type="text" placeholder="nome do comprador" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="number" placeholder="numero do cartao" onChange={(e) => setNumber(e.target.value)} value={number} />
                <div className="card-details">
                  <input type="month" min="2020-08" placeholder="data de vencimento" onChange={(e) => setDate(e.target.value)} value={date} />
                  <input type="text" placeholder="cvv" onChange={(e) => setCvv(e.target.value)} value={cvv} />
                </div>
                <button type="button" onClick={() => getCardInfo(setName, setNumber, setDate, setCvv)}>Usar dados de cadastro</button>
              </div>
            </div>
          </div>
          <div>
            <div className="collection-container">
              <h2>Detalhes da Entrega</h2>
              <p>Endereço</p>
              <div className="address-field">
                <input type="number" placeholder="cep" onChange={(e) => setAddressCep(e.target.value)} value={addressCep} />
                <input type="text" placeholder="rua" onChange={(e) => setAddressStreet(e.target.value)} value={addressStreet} />
                <div className="address-number">
                  <input type="number" placeholder="número" onChange={(e) => setAddressNumber(e.target.value)} value={addressNumber} />
                  <input type="text" placeholder="complemento" onChange={(e) => setAddressComplement(e.target.value)} value={addressComplement} />
                </div>
                <div>
                  <input type="text" placeholder="cidade" onChange={(e) => setAddressCity(e.target.value)} value={addressCity} />
                  <input type="text" placeholder="estado" onChange={(e) => setAddressState(e.target.value)} value={addressState} />
                </div>
              </div>
              <button type="button" onClick={() => getAddressInfo(setAddressCep, setAddressComplement, setAddressNumber, setAddressState, setAddressStreet, setAddressCity)}>Usar dados de cadastro</button>
            </div>
          </div>
        </div>
        <Link to="/confirm">
          <button
            className="finish-shop-button"
            onClick={() => finishThePurchaser(
              addressStreet, addressNumber, addressCity, addressState, purchaseFinished,
            )}
            type="button"
          >
            Finalizar Compra
          </button>
        </Link>
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
