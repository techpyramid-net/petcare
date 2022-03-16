let initState = {
  hiredPet: {},
  chatList: [],
};

export const CustomReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'HIRED_PETS':
      return {
        ...state,
        hiredPet: payload,
      };
    case 'CHAT_LIST':
      return {
        ...state,
        chatList: payload,
      };
    default:
      return state;
  }
};
