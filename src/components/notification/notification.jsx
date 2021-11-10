import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './notification.scss';
import close from '../../assets/icons/close.svg';
import closeInvert from '../../assets/icons/close-invert.svg';
import { BsExclamationCircle, BsExclamationTriangle } from 'react-icons/bs';
import { classes, imageRole, warningType, autoHideDuration, defaultType } from './constants';
import classNames from 'classnames';

const Notification = ({ title, type = defaultType, duration, onClose, open }) => {
  let timeoutID = null;
  useEffect(() => {
    if (open) {
      timeoutID = setTimeout(() => {
        onClose && onClose();
      }, duration || autoHideDuration);
    }
  }, [open]);

  const errorIconClasses = {
    [classes.icon]: true,
    [classes.errorIconColor]: true,
  };

  const warningIconClasses = {
    [classes.icon]: true,
    [classes.warningIconColor]: true,
  };

  const iconType = {
    error: <BsExclamationCircle className={classNames({ ...errorIconClasses })} />,
    success: null,
    general: null,
    warning: <BsExclamationTriangle className={classNames({ ...warningIconClasses })} />,
  };

  return (
    open && (
      <div className={classes.container}>
        <div className={`${classes.notification} ${type}`}>
          <div className={classes.image}>{iconType[type]}</div>

          <div className={classes.title}>{title}</div>

          <img
            className={classes.closeButton}
            src={type == warningType ? close : closeInvert}
            alt={type}
            onClick={() => {
              onClose && onClose();
              clearTimeout(timeoutID);
            }}
          />
        </div>
      </div>
    )
  );
};

Notification.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.oneOf(['general', 'success', 'error', 'warning']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Notification;
