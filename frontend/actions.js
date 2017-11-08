/*
* action creators - functions that return objects
* object used by redux to determine what action fired and what data passed
* redux then uses a reducer to update the global state
*/
export function LoginAction() {
  return { type: 'login' }
}

export function LogoutAction() {
  console.log('Logout Action');
  return { type: 'logout' }
}
