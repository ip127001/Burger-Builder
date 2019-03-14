import React, { Component } from 'react';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBulder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
