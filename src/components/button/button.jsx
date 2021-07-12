import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';
import classNames from 'classnames';
import {
  classes,
  largeProp,
  mediumProp,
  primaryProp,
  secondaryProp,
  smallProp,
  textOnlyProp,
} from './constants';

const Button = (props) => {
  const { variant, size, children, ...rest } = props;

  const btnClass = {
    [classes.button]: true,
    [classes.buttonPrimary]: variant === primaryProp,
    [classes.buttonSecondary]: variant === secondaryProp,
    [classes.buttonTextOnly]: variant === textOnlyProp,
    [classes.buttonSmall]: size === smallProp,
    [classes.buttonMedium]: size === mediumProp,
    [classes.buttonLarge]: size === largeProp,
  };

  return (
    <button className={classNames({ ...btnClass })} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string.isRequired,
  children: PropTypes.string,
};

export default Button;
