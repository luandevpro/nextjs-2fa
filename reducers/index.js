import { combineReducers } from 'redux';
import useActiveStep from './useActiveStep';
import useError from './useError';

const reducers = combineReducers({
  activeStep: useActiveStep,
  errorValidate: useError,
});

export default reducers;
