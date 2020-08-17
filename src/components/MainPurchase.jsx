import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../images/logo.svg';
import user from '../images/user.svg';

import '../CSS/MainPurchase.css';
import { userData, clearTemporaryData } from '../actions/index';

class MainPurchase extends Component {
  setUserDataToCart(obj, text, clearInProgress) {
    clearInProgress();
    if (text === 'none') {
      localStorage.setItem('dataToPurchase', JSON.stringify([obj]));
      return;
    }
    const oldData = JSON.parse(localStorage.getItem('dataToPurchase') || '[]');
    localStorage.setItem('dataToPurchase', JSON.stringify([...oldData, obj]));
  }

  componentDidMount() {
    const {
      data, temporaryData, saveUserData, clearInProgress,
    } = this.props;
    const allDataOnLS = JSON.parse(localStorage.getItem('usersData') || '[]');
    // const objInLocalStorage = allDataOnLS.some((elem) => elem.email === user.log);
    // const objInStore = data.some((elem) => elem.email === user.log);
    // if (!temporaryData) this.setUserSellDataWithRedux(temporaryData);
    // if (data) this.setUserSellDataWithLS(data);
    console.log(temporaryData);
    const objTolocalStorage = {
      id: temporaryData.id,
      email: temporaryData.email,
      nome: temporaryData.name,
      birth: temporaryData.birthDay,
      address: {
        cep: temporaryData.CEP,
        number: temporaryData.adressNumber,
        complement: temporaryData.complement,
        city: temporaryData.city,
        street: temporaryData.street,
        stateLetter: temporaryData.stateLetter,

      },
      card: {
        number: temporaryData.cardNumber,
        cvv: temporaryData.CVV,
        cardHolder: temporaryData.cardName,
        dueDate: temporaryData.dueDate,
      },
    };
    if (allDataOnLS.length > 0 && temporaryData.email !== '') {
      const newData = [...allDataOnLS, temporaryData];
      localStorage.setItem('usersData', JSON.stringify(newData));
      this.setUserDataToCart(objTolocalStorage, 'some', clearInProgress);
      // saveUserData(newData);
    }
    if (allDataOnLS.length < 1 && temporaryData.email !== '') {
      localStorage.setItem('usersData', JSON.stringify([temporaryData]));
      this.setUserDataToCart(objTolocalStorage, 'none', clearInProgress);
      // saveUserData(temporaryData);
    }
  }

  renderindividualButton() {
    return (
      <div className="conteinerButtonMP">
        <Link to="/products-list">
          <button
            className="ButtonMainPurchase"
            type="button"
          >
            Individual
          </button>
        </Link>
      </div>
    );
  }

  renderGroupButton() {
    return (
      <div className="conteinerButtonMP">
        <Link to="/event-choice">
          <button
            className="ButtonMainPurchase"
            type="button"
          >
            Grupo
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="main-container">
        <div className="products-page-nav">
          <div><img src={logo} alt="" width="100px" /></div>
          <h1 />
          <div />
        </div>
        <div className="conteinerMainPurchase">
          {this.renderindividualButton()}
          {this.renderGroupButton()}
        </div>
        <div className="footer">
          <div />
          <Link to="/Perfil"><img src={user} alt="" width="30px" /></Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // saveUserData: (obj) => dispatch(userData(obj)),
  clearInProgress: () => dispatch(clearTemporaryData()),
});

const mapStateToProps = (state) => ({
  // data: state.finishedUserData,
  temporaryData: state.inProgressRegister,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPurchase);

MainPurchase.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  temporaryData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
