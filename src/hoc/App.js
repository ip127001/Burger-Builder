import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBulder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import Orders from './../containers/Orders/Orders';
import Auth from './../containers/Auth/Auth';
import Logout from './../containers/Auth/Logout/logout';
import * as action from '../store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.isAuthStored();
  }

  render() {
    // let routes = (
    //   <Switch>
    //     <Route path="/auth" exact component={Auth} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //     {/* <Redirect to="/" /> */}
    //   </Switch>
    // )

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/checkout" component={Checkout} />
    //       <Route path="/orders" component={Orders} />
    //       <Route path="/logout" exact component={Logout} />
    //       <Route path="/" exact component={BurgerBuilder} />
    //       {/* <Redirect to="/" /> */}
    //     </Switch>
    //   )
    // }
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
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
