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
                ...state
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default reducer;