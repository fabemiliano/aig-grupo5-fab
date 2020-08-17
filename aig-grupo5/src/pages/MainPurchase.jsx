import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/MainPurchase.css';

class MainPurchase extends Component {
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
        <Link to="/create-event">
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

  renderBackToPerfilButton() {
    return (
      <div className="conteinerButtonMP">
        <Link to="/feedback">
          <button
            className="ButtonMainPurchase"
            type="button"
          >
            Ir Para Perfil
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="conteinerMainPurchase">
        {this.renderindividualButton()}
        {this.renderGroupButton()}
        {this.renderBackToPerfilButton()}
      </div>
    );
  }
}

export default MainPurchase;
