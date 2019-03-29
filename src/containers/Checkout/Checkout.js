import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // componentDidUpdate() {
    //     let cnt = this.state.count;
    //     cnt++;
    //     if(cnt === 1) {
    //         this.setState({
    //             ingredients: { salad: 0, cheese: 0, tikki: 0, cabbage: 0},
    //             count: cnt
    //         });
    //     }
    //     console.log('[checkout.js] componentDidUpdate', this.state.ingredients, cnt);
    // }

    goBack = () => {
        this.props.history.goBack();
    }

    goForward = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        let purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        if (this.props.ings) {
            summary = (
                <div>
                    {purchaseRedirect}
                <CheckoutSummary 
                    goBack = {this.goBack} 
                    goForward = {this.goForward} 
                    ingredients = {this.props.ings} /> 
                <Route 
                    path = {this.props.match.path + '/contact-data'} 
                    component={ContactData} /> 
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);    