// function rootReducer(state = {name: 'Horizons'}, action) {
import { combineReducers } from 'redux'
const initialState = {  //Initial state never changes so const
  loginStatus: false
}

const deptArray= [{id:"AAS", name:"African American Studies", checked:false},{id:"AFS", name:"African Studies", checked:false}]

const initFilters = {
    dept: deptArray
}

const filterUrl= {active:false,url:{}};

function logins(state, action) {

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
            console.log(action.payload);
            return Object.assign( {}, state, action.payload.logins);

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

/*function depts(state = deptArray, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
            console.log("Rehydrate Action Type");
            console.log(action.payload);
            return Object.assign( [], state, action.payload.depts);
    case 'TOGGLE_DEPT':
      return state.map(dept => {
        if (dept.id === action.id) {
          return Object.assign({}, dept, {
            checked: !dept.checked
          })
        }
        return dept
      })
    default:
      return state
  }
}*/

function filters(state=filterUrl,action) {
    switch (action.type) {
    case 'persist/REHYDRATE':
            console.log("Rehydrate Action Type");
            console.log(action.payload);
            return Object.assign( [], state, action.payload.filters);

    case 'FILTER_ON':
        if(action.url)
        {
          return Object.assign({}, state, {
            active: true,
            url: action.url
          })
        }
        else
        {
            return Object.assign({}, state, {
                active:false
            })
        }


    default:
      return state
  }
}

const rootReducer = combineReducers({
  logins,
  filters
})

export default rootReducer;
