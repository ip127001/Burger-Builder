import React, { Component } from 'react';

import axios from '../../axios-orders';

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
        ingredients: null,
        totalPrice: 4,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-react-2d64c.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(err => {
            this.setState({error: true})
        });
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
        // this.setState({loading: true});
        // const order = {
        //     ingredient: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'rohit kumawat',
        //         address: {
        //             zipCode: '302017',
        //             street: 'Malviya nagar',
        //             country: 'India'
        //         },
        //         email: 'geekrk.01@gmail.com'
        //     },
        //     delivery: 'fastest',
        //     payment: 'cash'
        // }
        // axios.post('/orders.json', order)
        // .then(response => this.setState({loading: false, purchasing: false}))
        // .catch(error => this.setState({loading: false, purchasing: false}));
        this.props.history.push('/checkout');
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; 
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        console.log(this.state.ingredients);
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <=0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
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
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary;
        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseProceedHandler}
                                ingredients={this.state.ingredients} 
                                price={this.state.totalPrice} />;
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
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

export default WithErrorHandler(BurgerBuilder, axios);