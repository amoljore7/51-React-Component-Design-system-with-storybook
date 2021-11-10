import React, { cloneElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Typography from '../typography';
import { classes, tooltipId, tooltipMargin } from './constants';
import './tooltip.scss';

const changeTooltipPos = (tooltipElement, element, position) => {
  const rect = element.getBoundingClientRect();
  const absWidthDiff = Math.abs(tooltipElement.offsetWidth - rect.width);
  const absHeightDiff = Math.abs(tooltipElement.offsetHeight - rect.height);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  const moveToTop = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      (tooltipElement.offsetWidth >= rect.width ? absWidthDiff / 2 : -1 * (absWidthDiff / 2))
    }px,${rect.top + window.pageYOffset - tooltipElement.offsetHeight - tooltipMargin}px,0)`;
  };

  const moveToBottom = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      (tooltipElement.offsetWidth >= rect.width ? absWidthDiff / 2 : -1 * (absWidthDiff / 2))
    }px,${rect.bottom + window.pageYOffset + tooltipMargin}px,0)`;
  };

  const moveToLeft = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left + window.pageXOffset - tooltipElement.offsetWidth - tooltipMargin
    }px,${
      rect.top +
      window.pageYOffset -
      (tooltipElement.offsetHeight >= rect.height ? absHeightDiff / 2 : -1 * (absHeightDiff / 2))
    }px,0)`;
  };

  const moveToRight = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.right + window.pageXOffset + tooltipMargin
    }px,${
      rect.top +
      window.pageYOffset -
      (tooltipElement.offsetHeight >= rect.height ? absHeightDiff / 2 : -1 * (absHeightDiff / 2))
    }px,0)`;
  };

  const adjustTopPosition = () => {
    if (rect.top - tooltipElement.offsetHeight - tooltipMargin < 0) {
      moveToBottom();
    } else {
      moveToTop();
    }
  };
  const adjustBottomPosition = () => {
    if (rect.bottom + tooltipElement.offsetHeight + tooltipMargin > vh) {
      moveToTop();
    } else {
      moveToBottom();
    }
  };
  const adjustLeftPosition = () => {
    if (rect.left - tooltipElement.offsetWidth - tooltipMargin < 0) {
      moveToRight();
    } else {
      moveToLeft();
    }
  };
  const adjustRightPosition = () => {
    if (rect.right + tooltipMargin + tooltipElement.offsetWidth > vw) {
      moveToLeft();
    } else {
      moveToRight();
    }
  };

  switch (position) {
    case 'top':
      adjustTopPosition();
      break;
    case 'bottom':
      adjustBottomPosition();
      break;
    case 'left':
      adjustLeftPosition();
      break;
    case 'right':
      adjustRightPosition();
      break;
  }
};

const Tooltip = ({ title, children, position }) => {
  const [tooltipElement] = useState(document.createElement('div'));
  const [isOpen, setIsOpen] = useState(false);
  const childRef = useRef();
  tooltipElement.id = `${tooltipId}`;
  tooltipElement.style.position = 'absolute';
  tooltipElement.style.pointerEvents = 'none';
  tooltipElement.style.willChange = 'transform';
  tooltipElement.style.zIndex = 2000;
  tooltipElement.style.top = 0;
  tooltipElement.style.left = 0;

  useEffect(() => {
    document.body.appendChild(tooltipElement);
    return () => {
      document.body.removeChild(tooltipElement);
    };
  }, []);

  useLayoutEffect(() => {
    if (childRef && childRef.current && isOpen) {
      changeTooltipPos(tooltipElement, childRef.current, position);
    }
  }, [isOpen]);

  return (
    <>
      {cloneElement(React.Children.only(children), {
        ref: childRef,
        onMouseOver: (e) => {
          setIsOpen(true);
        },
        onMouseLeave: (e) => {
          setIsOpen(false);
        },
      })}
      {isOpen &&
        createPortal(
          <div className={classes.tooltipContainer}>
            <Typography variant="body">{title} </Typography>
          </div>,
          tooltipElement
        )}
    </>
  );
};

export default Tooltip;
