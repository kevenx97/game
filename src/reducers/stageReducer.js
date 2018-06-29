const INITIAL_STATE = {
  auth: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'HANDLE_AUTH':
      return { ...state, auth: action.payload }  
    default:
			return state;
  }
}

