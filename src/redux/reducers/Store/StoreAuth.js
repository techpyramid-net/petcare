let initState = {
  currentStoreUser: '',
  isStoreUserAuthenticated: false,
  loaderForStore: true,
};

export const StoreAuthReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'STORE_CURRENT_USER':
      return {
        ...state,
        currentStoreUser: payload,
        isStoreUserAuthenticated: true,
        loaderForStore: false,
      };
    case 'STORE_SESSION_ENEDE':
      return {
        ...state,
        loaderForStore: false,
      };
    case 'STORE_LOGOUT':
      return {
        ...state,
        isStoreUserAuthenticated: false,
      };
    default:
      return state;
  }
};
