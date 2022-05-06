const initialState = {
    accounts: [],
    loading: true
}

const accountReducers = (state = initialState, action) =>{
    switch(action.type){
        case 'GET_ACCOUNT':
            return {
                ...state,
                accounts: action.payload,
                loading: false,
              };
        default:
            return state
    }
}

export default accountReducers;