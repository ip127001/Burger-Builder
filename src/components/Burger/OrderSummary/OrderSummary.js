import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate() {
        console.log('[Ordersummary] WillUpdate');
    }

    ingredientsList = Object.keys(this.props.ingredients)
        .map((key,i) => {
            return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span> : {this.props.ingredients[key]}</li>
        });

    render() {
        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>your burger has following ingredients</p>
                <ul>
                    {this.ingredientsList}
                </ul>
                <p>Total Price: {this.props.price} </p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Proceed</Button>
            </Aux>
        );
    }
}

export default OrderSummary;