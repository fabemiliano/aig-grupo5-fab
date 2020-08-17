import React from 'react';
import { Link } from 'react-router-dom';
import bottles from '../images/bottles.svg';

function BackToProductsList() {
  return (
    <div>
      <Link to="/products-list"><img src={bottles} width="30pc" alt="" /></Link>
    </div>
  );
}

export default BackToProductsList;
