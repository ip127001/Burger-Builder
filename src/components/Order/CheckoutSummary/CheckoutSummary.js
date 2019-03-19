import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>we hope</h1>
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.goBack}>Cancel</Button>
            <Button btnType="Success" clicked={props.goForward}>Success</Button>
        </div>
    )
}

export default checkoutSummary;