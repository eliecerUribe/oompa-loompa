const initialState = {
  items: { data: {}, loading: false, errors: null },
  activeItem: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        ...state,
        items: {
          ...state.items,
          loading: true,
          errors: null,
        },
      };
    case "FETCH_ALL_SUCCESS":
      return {
        ...state,
        items: {
          ...state.items,
          loading: false,
          data: action.payload,
        },
      };
    case "FETCH_ALL_FAILURE":
      return {
        ...state,
        items: {
          ...state.items,
          loading: false,
          errors: action.payload,
        },
      };
    case "SET_ACTIVE":
      return {
        ...state,
        activeItem: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
