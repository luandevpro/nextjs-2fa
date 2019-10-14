const initialState = null;

const useError = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR_VALIDATE':
      return action.payload;
    default:
      return state;
  }
};

export default useError;
