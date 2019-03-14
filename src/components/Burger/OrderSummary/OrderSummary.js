import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    // This could be a functional component with no class \

    render() {
        const ingredientsList = Object.keys(this.props.ingredients)
            .map(key => {
                return <li key={key}>{key} : {this.props.ingredients[key]}</li>
            });

        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>your burger has following ingredients</p>
                <ul>
                    {ingredientsList}
                </ul>
                <p>Total Price: {this.props.price.toFixed(2)} </p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Proceed</Button>
            </Aux>
        );
    }
}

export default OrderSummary;