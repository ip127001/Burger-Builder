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

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    cabbage: 0.3,
    tikki: 1.3
}

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://burger-builder-react-2d64c.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(err => {
        //     this.setState({error: true})
        // });
    }

    updatePurchaseState = (ingredient) => {
        const totalIngredients = Object.keys(ingredient)     //['cheese', 'tikki', 'cabbage', 'salad']
            .map(keys => {  
                    return ingredient[keys];
            })
            .reduce((prev, current) => {
                return prev + current
            }, 0)

        this.setState({purchasable: totalIngredients <= 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseProceedHandler = () => {
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        console.log(queryString);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type]; 
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        console.log(this.props.ingredients);
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        if (oldCount <=0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }


    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary;
        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseProceedHandler}
                                ingredients={this.props.ingredients} 
                                price={this.state.totalPrice} />;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable} 
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
        ings: state.ingredients
    }
}

const dispatchActionToProps = dispatch => {
    return {
        onIngredientAdded: () => dispatch({type: 'ADD_INGREDIENT'}),
        onIngredientRemoved: () => dispatch({type: 'REMOV_INGREDIENT'})
    }
}

export default connect(mapStateToProps, dispatchActionToProps)(WithErrorHandler(BurgerBuilder, axios));