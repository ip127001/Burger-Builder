import React, { Component } from 'react';

import axios from '../../axios-orders';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     // axios.get('https://burger-builder-react-2d64c.firebaseio.com/ingredients.json')
    //     // .then(response => {
    //     //     this.setState({ingredients: response.data});
    //     // })
    //     // .catch(err => {
    //     //     this.setState({error: true})
    //     // });
    // }

    updatePurchaseState = (ingredients) => {
        const totalIngredients = Object.keys(ingredients)     //['cheese', 'tikki', 'cabbage', 'salad']
            .map(keys => {  
                    return ingredients[keys];
            })
            .reduce((prev, current) => {
                return prev + current
            }, 0)

        return totalIngredients <= 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseProceedHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary;
        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            orderSummary = <OrderSummary
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseProceedHandler}
                                ingredients={this.props.ings} 
                                price={this.props.price} />;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)} 
                        ordered={this.purchaseHandler} />
                </Aux>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const dispatchActionToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: igName}),
        onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: igName})
    }
}

export default connect(mapStateToProps, dispatchActionToProps)(WithErrorHandler(BurgerBuilder, axios));