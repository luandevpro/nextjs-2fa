import React from 'react';
import { Field } from 'formik';
import { useSelector } from 'react-redux';

export default () => {
  const errorValidate = useSelector((state) => state.errorValidate);
  return (
    <div>
      <h1>Bước 2 : Validate</h1>
      {errorValidate && <div className="alert alert-danger">{errorValidate}</div>}
      <Field
        name="number"
        placeholder="Enter your number"
        type="number"
        className="form-control mt-5"
      />
    </div>
  );
};
