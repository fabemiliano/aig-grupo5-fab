import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { userData, clearTemporaryData } from '../actions/index';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      individualClicked: false,
      groupClicked: false,
      preservedClicked: false,
      moneyClicked: false,
    };
  }

  componentDidMount() {
    const { data, temporaryData, saveUserData, clearInProgress } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    const allDataOnLS = JSON.parse(localStorage.getItem('usersData') || '[]');
    const objInLocalStorage = allDataOnLS.some((elem) => elem.email === user.log);
    const objInStore = data.some((elem) => elem.email === user.log);
    if (!objInLocalStorage && !objInStore && allDataOnLS.length === 0) {
      localStorage.setItem('usersData', JSON.stringify([temporaryData]));
      saveUserData(temporaryData);
      this.setState({ name: temporaryData.name, email: temporaryData.email});
    }
    if (!objInLocalStorage && !objInStore && allDataOnLS.length > 0) {
      const newData = [...allDataOnLS, temporaryData];
      localStorage.setItem('usersData', JSON.stringify(newData));
      saveUserData(temporaryData);
      this.setState({ name: temporaryData.name, email: temporaryData.email});
    }
    clearInProgress();
    this.setState({ name: data.name, email: data.email});
  }

  renderPerfilHeader() {
    const { name } = this.state;
    return (
      <div>
        <img src="" alt="avatar" />
        <h2>{name}</h2>
      </div>
    );
  }

  renderIndividualPurchase() {
    const { individualClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ "individualClicked": !individualClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(individualClicked) ? "⌄" : "›" }</h2>
        <h2>Meus Pedidos</h2>
        {}
      </div>
    );
  }

  renderGroupPurchase() {
    const { groupClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ "groupClicked": !groupClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(groupClicked) ? "⌄" : "›" }</h2>
        <h2>Meus Eventos</h2>
        {}
      </div>
    );
  }

  renderPreservedNature() {
    const { preservedClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ "preservedClicked": !preservedClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(preservedClicked) ? "⌄" : "›" }</h2>
        <h2>Quantidade Preservada</h2>
        {}
      </div>
    );
  }

  renderMoneySaved() {
    const { moneyClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ "moneyClicked": !moneyClicked })}
      >
        {/* <img src={} alt="arrow" />*/}
        <h2>{(moneyClicked) ? "⌄" : "›" }</h2>
        <h2>Dinheiro Economizado</h2>
        {}
      </div>
    );
  }

  renderPerfilFooter() {
    return (
      <div>
        <Link to="/mainPurchase">Nova compra</Link>
      </div>
    );
  }

  render() {
    const { temporaryData } = this.props;
    console.log(temporaryData)
    return (
      <div>
        {this.renderPerfilHeader()}
        {this.renderIndividualPurchase()}
        {this.renderGroupPurchase()}
        {this.renderPreservedNature()}
        {this.renderMoneySaved()}
        {this.renderPerfilFooter()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (obj) => dispatch(userData(obj)),
  clearInProgress: () => dispatch(clearTemporaryData()),
});

const mapStateToProps = (state) => ({
  data: state.finishedUserData,
  temporaryData: state.inProgressRegister,
});

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);

Perfil.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  temporaryData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
