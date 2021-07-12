import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './notification.scss';

const Notification = (props) => {
  const {
    position,
    title,
    description,
    icon,
    type,
    duration,
    errorList,
    width,
  } = props;

  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        setShowNotification(false);
      }, duration);
    }
  }, [duration]);

  return (
    showNotification && (
      <div className={`notification-container ${position}`}>
        <div className={`notification ${type}`} style={{ width: width }}>
          <button onClick={() => setShowNotification(false)}>X</button>
          <div className="notification-image">
            {icon && <img role="img" src={icon} alt="icon" />}
          </div>
          <div>
            {title && <p className="notification-title">{title}</p>}
            {description && (
              <p className="notification-message">{description}</p>
            )}
            {errorList && errorList.length
              ? errorList.map((index) => (
                  <p
                    key={index}
                    data-testid="errorItem"
                    className="notification-errorList"
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
  description: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  duration: PropTypes.number,
  errorList: PropTypes.array,
};

export default Notification;
