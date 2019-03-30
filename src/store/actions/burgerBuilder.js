import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS, 
        ingredientName: name
    }
}

export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS, 
        ingredientName: name
    }
}

export const setIngrediens = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }   
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-react-2d64c.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngrediens(response.data));
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed());
        });
    };
};