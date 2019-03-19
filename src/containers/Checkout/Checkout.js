import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cabbage: 1,
            cheese: 1,
            tikki: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        console.log(ingredients);
        this.setState({ingredients: ingredients});
    }

    goBack = () => {
        this.props.history.goBack();
    }

    goForward = () => {
        this.props.history.replace('/checkout/payment');
    }

    render() {
        return (
            <div>
                <CheckoutSummary goBack={this.goBack} goForward={this.goForward} ingredients={this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout;
