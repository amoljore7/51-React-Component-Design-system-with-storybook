import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  classes,
  radioType,
  iconAlt,
  imageRole,
  horizontal,
  vertical,
  keyPrefix,
  testId,
} from './constants';

import unselectedRadio from '../../assets/icons/enabled-unselected-radio.svg';
import selectedRadio from '../../assets/icons/enabled-selected-radio.svg';
import unselectedHoverRadio from '../../assets/icons/hover-unselected-radio.svg';
import selectedHoverRadio from '../../assets/icons/hover-selected-radio.svg';
import unselectedDisabledRadio from '../../assets/icons/disabled-unselected-radio.svg';
import selectedDisabledRadio from '../../assets/icons/disabled-selected-radio.svg';

import './radio.scss';

const RadioGroup = ({
  label,
  name,
  defaultValue = '',
  direction = horizontal,
  options,
  onChange,
}) => {
  const radioClass = {
    [classes.horizontalAlign]: true,
    [classes.verticalAlign]: direction === vertical,
  };
  const radioItemClass = {
    [classes.radioContainer]: true,
    [classes.radioContainerVertical]: direction === vertical,
  };
  const searchIndex = (value) => {
    const resultIndex = options.findIndex((data) => data.value === value);
    return resultIndex;
  };

  const [currentCheckedIndex, setCurrentCheckedIndex] = useState(searchIndex(defaultValue));

  const changeHandler = (e) => {
    const resultIndex = searchIndex(e.target.value);
    setCurrentCheckedIndex(resultIndex);
    onChange(e);
  };

  return (
    <>
      <div className={classes.mainLabel}>{label}</div>
      <div data-testid={testId} className={classNames({ ...radioClass })}>
        {options.map(({ label, value, disabled }, index) => {
          const reset = currentCheckedIndex !== index;
          const allProps = {
            name,
            defaultValue,
            changeHandler,
            reset,
            label,
            value,
            disabled,
          };

          return (
            <div key={`${keyPrefix}${index}`} className={classNames({ ...radioItemClass })}>
              <RadioButton {...allProps} />
            </div>
          );
        })}
      </div>
    </>
  );
};

const RadioButton = ({ name, label, value, disabled, reset, defaultValue, changeHandler }) => {
  const [radioCheck, setRadioCheck] = useState(defaultValue === value);
  const [radioHover, setRadioHover] = useState(false);
  const [radioIcon, setRadioIcon] = useState(disabled ? unselectedDisabledRadio : unselectedRadio);

  useEffect(() => {
    setRadioCheck(defaultValue === value);
  }, [defaultValue]);

  const radioLabelClass = {
    [classes.labelContainer]: true,
    [classes.disableLabel]: disabled,
  };

  const handleIconOnCheck = () => {
    if (!radioCheck && !disabled) {
      setRadioIcon(unselectedRadio);
    } else if (!radioCheck && disabled) {
      setRadioIcon(unselectedDisabledRadio);
    } else if (radioCheck && !disabled) {
      setRadioIcon(selectedRadio);
    } else if (radioCheck && disabled) {
      setRadioIcon(selectedDisabledRadio);
    }
  };

  const handleIconOnHover = () => {
    if (disabled) {
      if (radioCheck) {
        setRadioIcon(selectedDisabledRadio);
      } else {
        setRadioIcon(unselectedDisabledRadio);
      }
    } else {
      handleEnabledCase();
    }
  };

  const handleEnabledCase = () => {
    if (!radioCheck && radioHover) {
      setRadioIcon(unselectedHoverRadio);
    } else if (!radioCheck && !radioHover) {
      setRadioIcon(unselectedRadio);
    } else if (radioCheck && radioHover) {
      setRadioIcon(selectedHoverRadio);
    } else if (radioCheck && !radioHover) {
      setRadioIcon(selectedRadio);
    }
  };

  useEffect(handleIconOnCheck, [radioCheck, disabled]);
  useEffect(handleIconOnHover, [radioHover]);
  useEffect(() => {
    reset && setRadioCheck(false);
  }, [reset]);

  return (
    <>
      <div className={classes.iconContainer}>
        <input
          role={radioType}
          type={radioType}
          id={value}
          name={name}
          value={value}
          className={classes.radioBtnStyle}
          disabled={disabled}
          onChange={(e) => {
            setRadioCheck(true);
            changeHandler(e);
          }}
          onMouseOver={() => {
            setRadioHover(true);
          }}
          onMouseLeave={() => {
            setRadioHover(false);
          }}
        />
        <img role={imageRole} src={radioIcon} alt={iconAlt} />
      </div>
      <label htmlFor={value} className={classNames({ ...radioLabelClass })}>
        {label}
      </label>
    </>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  direction: PropTypes.oneOf([horizontal, vertical]),
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
