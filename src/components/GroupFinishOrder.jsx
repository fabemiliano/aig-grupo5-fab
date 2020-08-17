import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import user from '../images/user.svg';
import { chooseEvent } from '../actions/index';
import GroupBackToProductsList from './GroupBackToProductsList';

function GroupFinishOrder(props) {
  const id = localStorage.getItem('userID');
  return (
    <div>
      <div className="products-page-nav">
        <div><img src={logo} alt="" width="100px" /></div>
        <h1>Obrigado!</h1>
        <div />
      </div>
      <div className="container">
        <div className="final-message">
          <h1>Compra Realizada!</h1>
          {/* <p>{`Você economizou R$ ${discount}`}</p>
          <p>{`Você reduziu seu consumo de plástico em ${plasticSaved} g`}</p> */}
          <p>Obrigado por fazer um mundo melhor!</p>
          <p>Os participantes do Evento serão notificados sobre a finalização da compra e terão o valor de suas compras debitados no cartão.</p>
          <p>Apresente o QR Code abaixo para fazer a retirada</p>
        </div>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`} alt="" />
      </div>
      <div className="footer">
        <GroupBackToProductsList />
        <Link to="/Perfil"><img src={user} alt="" width="30px" /></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupFinishOrder);