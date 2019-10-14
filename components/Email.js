import React from 'react';
import { Field } from 'formik';

export default function Email() {
  return (
    <div>
      <h1>Bước 1 : Email</h1>
      <Field name="email" placeholder="Enter your email" className="form-control mt-5" />
    </div>
  );
}
