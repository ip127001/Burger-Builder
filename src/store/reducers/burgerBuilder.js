import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    cabbage: 0.3,
    tikki: 1.3
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const addIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
}

const removeIngredients = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt= {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    const newUpdatedState = {
        ingredients: {
            salad: action.ingredients.salad,
            cabbage: action.ingredients.cabbage,
            cheese: action.ingredients.cheese,
            tikki: action.ingredients.tikki
        },
        totalPrice: 4,
        error: false,
        building: false
    };
    return updateObject(state, newUpdatedState);
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action)
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredients(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state;
    }
}

export default reducer;