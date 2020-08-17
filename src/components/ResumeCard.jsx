import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import productList from '../services/productList';
import packageList from '../services/packageList';

const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));
const extraInfo = JSON.parse(localStorage.getItem('extraPurchaseData'));

class ResumeCard extends React.Component {
  render() {
    const { purchaseList } = this.props;
    return (
      <div>
        {
          purchaseList.map((initial) => {
            return shopstore.filter((middle) => middle.id_compra === initial).map((Final, index) => {
              const somaProdutos = Final.cart.reduce((acc, elem) => {
                return acc + (productList[elem.id].originalPrice * elem.total);
              }, []);
              const discount = Final.pack.reduce((acc, elem) => {
                const mult = (elem.total === '') ? 0 : elem.total;
                return acc + (packageList[(elem.id - 1)].price * mult);
              }, []);
              const total = somaProdutos - discount;
              return (
                <div>
                  <p>Compra realizada em {extraInfo[index].day}</p>
                  <p>Valor total de {total}</p>
                  <p>{(Final.collection.isDelivery) ? 'Delivery' : 'Retirada em loja'}</p>
                  <Link to={`/Detalhes/${Final.id}`}>detalhes</Link>
                </div>
              );
            })
          })
        }
      </div>
    );
  }
};

ResumeCard.propTypes = {
  purchaseList: PropTypes.array.isRequired,
};

export default ResumeCard;
