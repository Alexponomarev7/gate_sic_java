import React from "react";

const adminState = {
    competitions: null,
    submissions: null,
    text: null,
}


const adminReducer = (state=adminState, action) => {
    switch (action.type) {
        case 'ADD_COMPETITIONS':
            return {
                ...state,
                competitions: action.payload
            }
        case 'ADD_SUBMISSIONS':
            return {
                ...state,
                submissions: action.payload
            }
        case 'ADD_SUBTEXT':
            return {
                ...state,
                text: action.payload
            }
        default:
            return state

    }
}

export default adminReducer;