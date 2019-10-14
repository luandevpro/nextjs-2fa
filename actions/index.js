export const activeStep = () => {
  return {
    type: 'INCRE_STEP',
  };
};

export const errorValidate = (data) => {
  return {
    type: 'ERROR_VALIDATE',
    payload: data,
  };
};
