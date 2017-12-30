/*
* action creators - functions that return objects
* object used by redux to determine what action fired and what data passed
* redux then uses a reducer to update the global state
*/
export function LoginAction() {
  return { type: 'login' }
}

export function LogoutAction() {
  return { type: 'logout' }
}

export function filterOn(url) {
  return {
    type: 'FILTER_ON',
    url: url
  }
}
