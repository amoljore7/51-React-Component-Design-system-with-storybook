import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';
import { Card as CardClasses, defaultTabIndex, imageRole } from './constants';

const Card = ({ title, image, clickHandler }) => {
  return (
    <div className={CardClasses.container} onClick= {clickHandler} tabindex="0">
      <div className={CardClasses.imgContainer}>
        <img
          tabindex={defaultTabIndex}
          role={imageRole}
          className={CardClasses.imgStyle}
          src={image}
          alt={title}
        />
      </div>
      <div className={CardClasses.titleStyle}>{title}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};


export default Card;
