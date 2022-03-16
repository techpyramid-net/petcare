let initState = {
  currentAdmin: '',
  isAdminAuthenticated: false,
  loaderForAdmin: true,
};

export const AdminAuthReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'ADMIN_CURRENT_USER':
      return {
        ...state,
        // currentAdmin: payload,
        isAdminAuthenticated: true,
        loaderForAdmin: false,
      };
    case 'ADMIN_SESSION_ENEDE':
      return {
        ...state,
        loaderForAdmin: false,
      };
    case 'ADMIN_LOGOUT':
      return {
        ...state,
        isAdminAuthenticated: false,
      };
    default:
      return state;
  }
};
