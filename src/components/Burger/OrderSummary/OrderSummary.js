import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const ingredientsList = Object.keys(props.ingredients)
        .map((key,i) => {
            return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span> : {props.ingredients[key]}</li>
        });

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>your burger has following ingredients</p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Total Price: {props.price} </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Proceed</Button>
        </Aux>
    );
}

export default orderSummary;