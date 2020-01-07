const initialState = {
    isLoading: false,
    error: false,
    data: null,
    currentUser: null,
    isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_FETCHING':
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
                error: null,
                isLoading: true
            };
        case 'USER_FAIL':
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            };
        case 'USER_ANONYMOUS':
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
                data: action.payload
            };
        case 'USER_AUTH':
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
                error: null,
                isLoading: false
            };
        default:
            return state;
    }
};

export default userReducer
