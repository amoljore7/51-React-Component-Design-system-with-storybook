import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { spinnerSize, classes } from './constants';
import Typography from '../typography';
import './spinner.scss';

const Loader = ({ size, message }) => {
  const loaderClasses = {
    [classes.loader]: true,
    [classes.smallLoader]: size === spinnerSize.small,
    [classes.mediumLoader]: size === spinnerSize.medium,
    [classes.largeLoader]: size === spinnerSize.large,
  };
  return (
    <div className={classes.loaderContainer}>
      <div data-testid={classes.loader} className={classNames(loaderClasses)}></div>
      {message && <Typography variant="body">{message}</Typography>}
    </div>
  );
};

const LoaderWithOverlay = ({ size, message }) => {
  return (
    <div data-testid={classes.loaderOverlay} className={classes.loaderOverlay}>
      <Loader size={size} message={message} />
    </div>
  );
};

const Spinner = ({ size = spinnerSize.large, overlay, message }) => {
  return !overlay ? (
    <Loader size={size} message={message} />
  ) : (
    <LoaderWithOverlay size={size} message={message} />
  );
};

Spinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf([spinnerSize.small, spinnerSize.medium, spinnerSize.large]),
  overlay: PropTypes.bool,
};

export default Spinner;
