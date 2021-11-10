import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BiChevronRight, BiChevronDown } from 'react-icons/bi';
import {
  defaultIconSize,
  leafNodeKey,
  mousedownEvent,
  tabIndex,
  tabIndexNegative,
  trackingLineInitialWidth,
  trackingLineRestWidth,
  trackingLineSeperation,
  TreeNodeClasses,
  treeNodeKey,
} from './constants';
import { AiOutlineFolder } from 'react-icons/ai';
import { BsLock } from 'react-icons/bs';
import OverflowMenu from '../overflow-menu';
import './treeNode.scss';

const renderDirectionIcon = (expanded) => {
  return expanded ? (
    <BiChevronDown size={defaultIconSize} />
  ) : (
    <BiChevronRight size={defaultIconSize} />
  );
};
const LeafNode = ({ leave, level, clickHandler, parents, actionClickHandler }) => {
  const contentBoxRef = useRef();
  const [selected, setSelected] = useState(false);
  const [isHover, setHover] = useState(false);
  useLayoutEffect(() => {
    contentBoxRef.current.style.marginLeft = `${
      trackingLineInitialWidth + trackingLineRestWidth * level
    }px`;
  }, []);
  const handleOnBlur = (event) => {
    if (contentBoxRef && contentBoxRef.current && !contentBoxRef.current.contains(event.target))
      setSelected(false);
  };
  useEffect(() => {
    document.addEventListener(mousedownEvent, handleOnBlur);
    return () => {
      document.removeEventListener(mousedownEvent, handleOnBlur);
    };
  }, []);
  const leafClass = {
    [TreeNodeClasses.contentBoxContainer]: true,
    [TreeNodeClasses.contentBoxSelect]: selected,
  };
  return (
    <div
      className={classNames({ ...leafClass })}
      onClick={() => {
        setSelected(true);
        clickHandler(parents);
      }}
      tabIndex={tabIndex}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={TreeNodeClasses.contentBox} ref={contentBoxRef} tabIndex={tabIndex}>
        <div className={TreeNodeClasses.contentBoxLeftWrapper}>
          <div className={TreeNodeClasses.contentBoxIcon}>
            <BsLock size={defaultIconSize} />
          </div>
          <div className={TreeNodeClasses.contentBoxText}>
            <span>{leave.label}</span>
          </div>
        </div>
        {isHover && (
          <OverflowMenu
            onClick={(e) => {
              e.stopPropagation();
            }}
            options={leave.actionItems}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => {
              event.stopPropagation();
              setHover(false);
              actionClickHandler(parents, value);
            }}
          />
        )}
      </div>
    </div>
  );
};

const ParentNode = ({
  name,
  actionItems,
  expansionHandler,
  expanded,
  level,
  parents,
  clickHandler,
  isNodesEmpty,
  isLeavesEmpty,
  actionClickHandler,
  expandIconClickHandler,
  hasChildren,
}) => {
  const parentRef = useRef();
  const parentContainerRef = useRef();
  const [selected, setSelected] = useState(false);
  const [isHover, setHover] = useState(false);
  useLayoutEffect(() => {
    parentRef.current.style.marginLeft = `${
      level === 0
        ? 0
        : trackingLineInitialWidth + trackingLineRestWidth * (level - 1) + trackingLineSeperation
    }px`;
  }, []);

  const handleOnBlur = (event) => {
    if (
      parentContainerRef &&
      parentContainerRef.current &&
      !parentContainerRef.current.contains(event.target)
    )
      setSelected(false);
  };

  useEffect(() => {
    document.addEventListener(mousedownEvent, handleOnBlur);
    return () => {
      document.removeEventListener(mousedownEvent, handleOnBlur);
    };
  }, []);

  const parentNodeClass = {
    [TreeNodeClasses.parentNodeContainer]: true,
    [TreeNodeClasses.parentNodeContainerSelect]: selected,
  };
  const expandIconTabIndex = !(isNodesEmpty() && isLeavesEmpty()) ? tabIndex : tabIndexNegative;

  return (
    <div
      className={classNames({ ...parentNodeClass })}
      ref={parentContainerRef}
      onClick={() => {
        setSelected(true);
        clickHandler(parents);
      }}
      tabIndex={tabIndex}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={TreeNodeClasses.parentContainer} ref={parentRef}>
        <div className={TreeNodeClasses.treeNodeParentContainerLeftWrapper}>
          {
            <div
              className={TreeNodeClasses.dirIconContainer}
              onClick={(e) => {
                e.stopPropagation();
                expansionHandler();
                !expanded && expandIconClickHandler && expandIconClickHandler(parents);
              }}
              tabIndex={expandIconTabIndex}
            >
              {hasChildren && renderDirectionIcon(expanded)}
            </div>
          }
          <div className={TreeNodeClasses.parentIcon}>
            <AiOutlineFolder size={defaultIconSize} />
          </div>
          <div className={TreeNodeClasses.parentText}>{name}</div>
        </div>
        {isHover && (
          <OverflowMenu
            onClick={(e) => {
              e.stopPropagation();
            }}
            options={actionItems}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => {
              event.stopPropagation();
              setHover(false);
              actionClickHandler(parents, value);
            }}
          />
        )}
      </div>
    </div>
  );
};
const TreeNode = ({
  nodes,
  level,
  parents,
  clickHandler,
  expandIconClickHandler,
  actionClickHandler,
}) => {
  const [expanded, setExpanded] = useState(false);
  const borderNode = useRef();
  const containerNode = useRef();

  useLayoutEffect(() => {
    if (expanded && (!isLeavesEmpty() || !isNodesEmpty())) {
      borderNode.current.style.left = `${
        trackingLineInitialWidth + trackingLineRestWidth * level
      }px`;
    }
  });
  const expansionHandler = () => {
    setExpanded(!expanded);
  };
  const isNodesEmpty = () => {
    return !nodes.nodes || nodes.nodes.length === 0;
  };
  const isLeavesEmpty = () => {
    return !nodes.leaves || nodes.leaves.length === 0;
  };
  const parentNodeProps = {
    name: nodes.label,
    actionItems: nodes.actionItems,
    hasChildren: nodes.hasChildren,
    expansionHandler,
    expanded,
    level,
    isNodesEmpty,
    isLeavesEmpty,
    parents: [...parents, { ...nodes }],
    clickHandler,
    actionClickHandler,
    expandIconClickHandler,
  };
  return (
    <div className={TreeNodeClasses.container} ref={containerNode}>
      {<ParentNode {...parentNodeProps} />}
      {expanded &&
        nodes.nodes &&
        nodes.nodes.map((node, index) => {
          const treeNodeProps = {
            nodes: node,
            level: level + 1,
            parents: [...parents, { ...nodes }],
            clickHandler,
            key: `${treeNodeKey}-${nodes.label}-${index}`,
            actionClickHandler,
            expandIconClickHandler,
          };
          return <TreeNode {...treeNodeProps} />;
        })}
      {expanded &&
        nodes.leaves &&
        nodes.leaves.map((leave, index) => {
          const leafNodeProps = {
            clickHandler: clickHandler,
            leave: leave,
            level,
            parents: [...parents, { ...nodes }, { ...leave }],
            key: `${leafNodeKey}-${nodes.label}-${index}`,
            actionClickHandler,
          };
          return <LeafNode {...leafNodeProps} />;
        })}
      {expanded && (!isLeavesEmpty() || !isNodesEmpty()) && (
        <div ref={borderNode} className={TreeNodeClasses.trackingLine} />
      )}
    </div>
  );
};

export default TreeNode;
