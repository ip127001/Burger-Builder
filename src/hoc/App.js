import React, { Component } from 'react';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBulder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
