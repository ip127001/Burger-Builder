import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = ( props ) => {
    const ingredientsList = Object.keys(props.ingredients)
        .map(key => {
            return <li><span style={{textTransform: 'capitalize'}}>{key}</span> : {props.ingredients[key]}</li>
        });

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>your burger has following ingredients</p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Continue to Checkout?</p>
            <button>Cancel</button>
            <button>Proceed</button>
        </Aux>
    );
}

export default orderSummary;