// function rootReducer(state = {name: 'Horizons'}, action) {
const initialState = {  //Initial state never changes so const
  loginStatus: false
}

function rootReducer(state, action) {

    console.log('Reducer State');
    console.log(state);

    // console.log('Reducer Action');
    // console.log(action);

    if (typeof state === 'undefined'){
      console.log('State is undefined');
      return initialState
    }

    switch (action.type) {
        case 'persist/REHYDRATE':
            console.log("Rehydrate Action Type");
            return Object.assign( {}, state, action.payload);

        case "login":
            console.log("Login action");
            return Object.assign( {}, state, {loginStatus: true});

        case 'logout':
            console.log('Logout action');
            return Object.assign( {}, state, {loginStatus: false});

        default:
            console.log('Default action');
            return state;
    }
}

export default rootReducer;
