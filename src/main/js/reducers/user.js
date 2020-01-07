const initialState = {
    isLoading: false,
    error: false,
    data: null,
    currentUser: null,
    isAuthenticated: false,
    history: null,
}

const userReducer = (state = initialState, action) => {
    console.warn(action)
    switch (action.type) {
        case 'USER_FETCHING':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: true
            };
        case 'USER_FAIL':
            return {
                ...state,
                isLoading: false,
            };
        case 'USER_ANONYMOUS':
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
                data: null,
            };
        case 'USER_AUTH':
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case 'DATA_DONE':
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case 'DATA_FAIL':
            return {
              ...state,
              isLoading: false,
              error: action.payload
            };
        default:
            console.warn("default state reached")
            return state;
    }
};

export default userReducer
