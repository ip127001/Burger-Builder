import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import asyncComponent from '../hoc/asyncComponent/asyncComponent';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBulder/BurgerBuilder';
import Logout from './../containers/Auth/Logout/logout';
import * as action from '../store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('../containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('../containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('../containers/Auth/Auth');
})


class App extends Component {
  componentDidMount() {
    this.props.isAuthStored();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" exact component={asyncAuth} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isAuthStored: () => dispatch(action.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
