import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        tikki: 0,
        cabbage: 0,
        cheese: 0
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
            };
        default:
            return state;
    }
}

export default reducer;