import React, { useState } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import {
  defaultLength,
  defaultListRole,
  defaultTabIndex,
  keyPrefix,
  classes,
} from './constants'
import './breadcrumb.scss';

const renderBreadcrumbCompressed = (props) => {
  const firstItem = props.linkToNameList[0];
  const lastItem = props.linkToNameList[props.linkToNameList.length - 1];

  return (
    <ul role={defaultListRole} className={classes.container}>
      <BreadcrumbItem
        link={firstItem.link}
        name={firstItem.name}
        clickHandler={props.clickHandler}
        key={`${keyPrefix}0`}
      />
      <BreadcrumbItem
        overflowItem={true}
        expansionHandlder={props.expansionHandlder}
        key={`${keyPrefix}1`}
      />
      <BreadcrumbItem
        link={lastItem.link}
        name={lastItem.name}
        isLastItem={true}
        clickHandler={props.clickHandler}
        key={`${keyPrefix}2`}
      />
    </ul>
  );
};
const renderBreadcrumbExpander = (props) => {
  return (
    <ul role={defaultListRole} className={classes.container}>
      {props.linkToNameList &&
        props.linkToNameList.map((element, index) => {
          const link = element.link;
          const name = element.name;
          const isLastItem = index == props.linkToNameList.length - 1;
          const allProps = { link, name, isLastItem };
          return (
            <BreadcrumbItem key={`${keyPrefix}${index}`} {...allProps} clickHandler={props.clickHandler} />
          );
        })}
    </ul>
  );
};

const Breadcrumb = (props) => {
  const [isCompressed, setIsCompressed] = useState(
    props.linkToNameList.length > defaultLength
  );
  const expansionHandlder = () => {
    setIsCompressed(false);
  };

  return isCompressed
    ? renderBreadcrumbCompressed({ ...props, expansionHandlder })
    : renderBreadcrumbExpander(props);
};

const BreadcrumbItem = (props) => {
  const breadcrumbItemClasses = {
    [classes.item]: true,
    [classes.lastItem]: props.isLastItem,
  };
  const clickHandler = (event) => {
    props.clickHandler && props.clickHandler(event);
  };
  return !props.overflowItem ? (
    <li className={classNames(breadcrumbItemClasses)} tabIndex={defaultTabIndex}>
      <a href={props.link} onClick={clickHandler}>
        {props.name}
      </a>
      {!props.isLastItem && <span className={classes.seperator}>/</span>}
    </li>
  ) : (
    <li
      className={classNames(breadcrumbItemClasses)}
      onClick={() => props.expansionHandlder()}
      tabIndex={defaultTabIndex}
    >
      <span>...</span>
      <span className={classes.seperator}>/</span>
    </li>
  );
};
Breadcrumb.propTypes = {
  linkToNameList:
    PropTypes.arrayOf(
      PropTypes.shape(
        {
          link: PropTypes.string,
          name: PropTypes.string.isRequired
        }
      ).isRequired
    )
  ,
  clickHandler: PropTypes.func,
}
export default Breadcrumb;
