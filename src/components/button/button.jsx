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
  defaultSize,
  defaultVariant,
} from './constants';

const Button = ({
  variant = defaultVariant,
  size = defaultSize,
  children,
  onClick,
  disabled = false,
  type,
}) => {
  const btnClass = {
    [classes.button]: true,
    [classes.buttonPrimary]: variant === primaryProp,
    [classes.buttonSecondary]: variant === secondaryProp,
    [classes.buttonTextOnly]: variant === textOnlyProp,
    [classes.buttonSmall]: size === smallProp,
    [classes.buttonMedium]: size === mediumProp,
    [classes.buttonLarge]: size === largeProp,
    [classes.disabled]: disabled,
  };

  return (
    <button
      data-testid="button"
      className={classNames({ ...btnClass })}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string.isRequired,
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
