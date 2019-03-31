import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Cabbage', type: 'cabbage'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Tikki', type: 'tikki'}
]

const buildControls = (props) => {
    console.log(props.purchasable);
    return <div className={classes.BuildControls}>
        <p>totalPrice: <b>{props.totalPrice.toFixed(2)}</b></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)} 
                disable={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>

        }

export default buildControls;