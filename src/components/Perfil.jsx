import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import productList from '../services/productList';
import packageList from '../services/packageList';
import userchar from '../images/user.svg';
import logo from '../images/logo.svg';
import ResumeCard from './ResumeCard';

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
      purchase: [],
      shopstore: [],
      obj: {},
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.setState({ name: user.name, email: user.log });
    const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));
    const purchase = shopstore.reduce((arr, e) => {
      if (e.buyerId === user.log) {
        return [...arr, e.id_compra];
      } return arr;
    }, []);
    let obj = {};
    purchase.forEach((e) => obj = { ...obj, [e]: false });
    this.setState({ purchase, shopstore, obj });
  }

  renderPerfilHeader() {
    return (
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>
    );
  }

  renderIndividualPurchase() {
    const {
      individualClicked, purchase, shopstore, obj,
    } = this.state;
    let arrResume = [];
    if (purchase.length > 4) {
      arrResume = purchase.reduce((arr, elem, index) => {
        if (index > (purchase.length - 5)) {
          return [...arr, elem.id_compra];
        }
        return arr;
      }, []);
    } else {
      arrResume = purchase;
    }
    // console.log(arrResume)
    return (
      <div>
        {/* <img src={} alt="arrow" /> */}
        <h2>{(individualClicked) ? '⌄' : '›'}</h2>
        <h2 onClick={() => this.setState({ individualClicked: !individualClicked })}>Meus Pedidos</h2>
        {individualClicked && <ResumeCard purchaseList={arrResume} />}
        {/*
        {individualClicked && purchase.map((e, i) => (
          <div>
            <h2 onClick={() => { this.setState((state) => ({ obj: { ...state.obj, [e]: !state.obj[e] } })); }}>{`Compra ${i + 1}`}</h2>
            {
              obj[e] && (
                <div>
                  {shopstore.filter((el) => el.id_compra === e)[0].cart.map((ell) => {
                    const products = (productList.filter((elll) => elll.id === ell.id)[0]);
                    return (
                      <div className="make-flex">
                        <p>{`${products.productName} ${products.package_volume}L`}</p>

                        <p>{`x ${ell.total}`}</p>
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
        ))}
        {} */}
      </div>
    );
  }

  renderGroupPurchase() {
    const { groupClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ groupClicked: !groupClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(groupClicked) ? '⌄' : '›'}</h2>
        <h2>Meus Eventos</h2>
        {}
      </div>
    );
  }

  renderPreservedNature() {
    const { preservedClicked, purchase, shopstore } = this.state;
    return (
      <div
        onClick={() => this.setState({ preservedClicked: !preservedClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(preservedClicked) ? '⌄' : '›'}</h2>
        <h2>Quantidade Preservada</h2>
        {preservedClicked && `${purchase.reduce((summ, e) => {
          const packages = shopstore.filter((el) => el.id_compra === e)[0].pack;
          const total = packages.reduce((sum, ell) => sum + (packageList.filter((elll) => elll.id === ell.id)[0].weight * Number(ell.total)), 0);
          return summ + total;
        }, 0)}g de plástico reduzido`}
        {}
      </div>
    );
  }

  renderMoneySaved() {
    const { moneyClicked, shopstore, purchase } = this.state;
    return (
      <div
        onClick={() => this.setState({ moneyClicked: !moneyClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(moneyClicked) ? '⌄' : '›'}</h2>
        <h2>Dinheiro Economizado</h2>
        {moneyClicked && `R$${(purchase.reduce((summ, e) => {
          const packages = shopstore.filter((el) => el.id_compra === e)[0].pack;
          const total = packages.reduce((sum, ell) => sum + (packageList.filter((elll) => elll.id === ell.id)[0].price * Number(ell.total)), 0);
          return summ + total;
        }, 0)).toFixed(2)} economizados`}
        {}
      </div>
    );
  }

  renderPerfilFooter() {
    return (
      <div className="footer">
        <div />
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    );
  }

  render() {
    const { name } = this.state;
    return (
      <div className="container">
        {this.renderPerfilHeader()}
        <div className="sub-container">
          <h4>{`Olá ${name}`}</h4>
          {this.renderIndividualPurchase()}
          {this.renderGroupPurchase()}
          {this.renderPreservedNature()}
          {this.renderMoneySaved()}
        </div>
        {this.renderPerfilFooter()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.finishedUserData,
});

export default connect(mapStateToProps, null)(Perfil);

Perfil.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
