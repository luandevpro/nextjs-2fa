const initialState = 0;

const useActiveStep = (state = initialState, action) => {
  switch (action.type) {
    case 'INCRE_STEP':
      return state + 1;
    default:
      return state;
  }
};

export default useActiveStep;
