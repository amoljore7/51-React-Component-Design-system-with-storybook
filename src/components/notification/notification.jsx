import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './notification.scss';
import close from './asset/close.svg';
import closeInvert from './asset/close-invert.svg';
import { imageRole, errorRole } from './constants';
import { classes } from './constants';

const Notification = (props) => {
  const {
    position,
    title,
    icon,
    type,
    errorList,
    duration,
    link,
    text,
  } = props;

  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    {
      type !== 'formError' &&
        setTimeout(() => {
          setShowNotification(false);
        }, duration || 4000);
    }
  }, []);

  return (
    showNotification && (
      <div className={`notification-container ${position}`}>
        <div className={`notification ${type}`}>
          {type !== 'formError' && (
            <img
              className={classes.closeButton}
              src={type == 'warning' ? close : closeInvert}
              alt={type}
              onClick={() => setShowNotification(false)}
            />
          )}
          <div className={classes.image}>
            {icon && <img role={imageRole} src={icon} alt={title} />}
          </div>
          <div>
            {title && (
              <p className={classes.title}>
                {title}
                <a href={link} target="_blank">
                  {text}
                </a>
              </p>
            )}
            {errorList && errorList.length
              ? errorList.map((index) => (
                  <p
                    key={index}
                    data-testid={errorRole}
                    className={classes.errorList}
                  >
                    {index}
                  </p>
                ))
              : null}
          </div>
        </div>
      </div>
    )
  );
};

Notification.propTypes = {
  position: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  duration: PropTypes.number,
  errorList: PropTypes.array,
  link: PropTypes.string,
  text: PropTypes.string,
};

export default Notification;
