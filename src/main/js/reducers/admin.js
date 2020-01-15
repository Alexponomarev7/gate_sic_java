import React from "react";

const adminState = {
    competitions: null,
    submissions: null,
    curSub: null,
    curRes: null,
}


const adminReducer = (state=adminState, action) => {
    switch (action.type) {
        case 'ADD_COMPETITIONS':
            return {
                ...state,
                competitions: action.payload
            }
        case 'ADD_TO_LIST_COMPETITIONS':
            return {
                ...state,
                competitions: state.competitions.concat([action.payload])
            }
        case 'ADD_SUBMISSIONS':
            return {
                ...state,
                submissions: action.payload
            }
        case 'ADD_SUBMISSION':
            return {
                ...state,
                curSub: action.payload
            }
        case 'ADD_RESOLUTION':
            return {
                ...state,
                curRes: action.payload
            }
        default:
            return state

    }
}

export default adminReducer;