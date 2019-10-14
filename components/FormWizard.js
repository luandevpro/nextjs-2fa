import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function FormWizard({ children }) {
  const activeStep = useSelector((state) => state.activeStep);
  return <div>{children[activeStep]}</div>;
}

FormWizard.propTypes = {
  children: PropTypes.array, // eslint-disable-line
};
