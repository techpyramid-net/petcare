let initState = {
  currentUser: '',
  isUserAuthenticated: false,
  loaderForUser: true,
};

export const UserAuthReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: payload,
        isUserAuthenticated: true,
        loaderForUser: false,
      };
    case 'USER_SESSION_ENEDE':
      return {
        ...state,
        loaderForUser: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isUserAuthenticated: false,
      };
    default:
      return state;
  }
};
