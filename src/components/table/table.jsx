import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PaginationBar } from './tableElements';
import Unsorted from '../../assets/icons/column-unsorted.svg';
import SortedAscending from '../../assets/icons/column-ascending.svg';
import SortedDescending from '../../assets/icons/columns-descending.svg';
import {
  classes,
  navigationRole,
  paginationArialLabel,
  resizeEvent,
  searchBarSize,
  sortIconSuffix,
  sortingType,
  tabIndex,
  tableAriaLabel,
  tableCellPrefix,
  tableHeaderPrefix,
  tableRole,
  tableRowPrefix,
} from './constants';
import './table.scss';
import classNames from 'classnames';
import SearchInput from '../search/search';
const useTableWidth = () => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const element = document.getElementsByClassName(classes.table)[0];
    const updateWidth = () => {
      setWidth(element.offsetWidth);
    };
    window.addEventListener(resizeEvent, updateWidth);
    updateWidth();
    return () => window.removeEventListener(resizeEvent, updateWidth);
  }, []);
  return width;
};

const Table = ({ columns, rows, sortHandler, paginationModal, searchBar }) => {
  const headerProps = { sortHandler, columns };
  const tableNode = useRef();
  const tableWidth = useTableWidth();
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
    searchBar.onSearch(e.target.value);
  };
  const getWidth = () => {
    if (tableNode && tableNode.current) {
      return Math.max(tableWidth, tableNode.current.offsetWidth);
    } else {
      return tableWidth;
    }
  };

  return (
    <>
      {(searchBar || paginationModal) && (
        <div
          className={classes.pagination}
          style={{ width: getWidth() }}
          role={navigationRole}
          aria-label={paginationArialLabel}
          tabIndex={tabIndex}
        >
          {searchBar && (
            <div className={classes.searchContainer}>
              <SearchInput
                value={searchText}
                onChange={onChangeSearch}
                disabled={false}
                width={searchBarSize}
                placeholder={searchBar.placeholder}
              />
            </div>
          )}
          {paginationModal && <PaginationBar paginationModal={paginationModal} />}
        </div>
      )}
      <table ref={tableNode} className={classes.table} role={tableRole} aria-label={tableAriaLabel}>
        <TableHeader {...headerProps} />
        <tbody tabIndex={tabIndex}>
          {rows &&
            rows.map((row, index) => {
              const props = {
                row,
                rowIndex: index,
                columns,
              };
              return <TableRow key={`${tableRowPrefix}-${index}`} {...props} />;
            })}
        </tbody>
      </table>
    </>
  );
};
const TableHeader = ({ columns, sortHandler }) => {
  const [sortedColumn, setSortedColumn] = useState('');
  const headerSortHandler = (fieldName) => {
    sortedColumn !== fieldName && setSortedColumn(fieldName);
  };
  return (
    <thead tabIndex={tabIndex}>
      <tr tabIndex={tabIndex} className={classes.header}>
        {columns &&
          columns.map((column, index) => {
            const { headerName, sortable, field } = column;
            const reset = sortedColumn !== field;
            const iconProps = {
              sortHandler,
              field,
              reset,
              headerSortHandler,
            };
            return (
              <th
                className={classes.headerCell}
                key={`${tableHeaderPrefix}-${index}`}
                tabIndex={tabIndex}
                style={{ width: column.width, minWidth: column.width }}
                title={headerName}
              >
                <div className={classes.headerTextIconContainer}>
                  <div className={classes.headerText} tabIndex={tabIndex}>
                    {headerName}
                  </div>
                  {sortable && <SortIcon {...iconProps} />}
                </div>
              </th>
            );
          })}
      </tr>
    </thead>
  );
};
const renderTableRow = (row, columns, rowIndex) => {
  const arrTableCells = [];

  for (let fieldIndex = 0; fieldIndex < columns.length; fieldIndex++) {
    const column = columns[fieldIndex];
    arrTableCells.push(
      <TableCell
        key={`${tableCellPrefix}${rowIndex}-${fieldIndex}`}
        value={row[column.field]}
        horizontalAlignment={column.horizontalAlignment}
        width={column.width}
        renderColumn={column.renderColumn}
        row={row}
      />
    );
  }
  return arrTableCells;
};
const TableRow = ({ row, columns, rowIndex }) => {
  return <tr className={classes.row}>{row && renderTableRow(row, columns, rowIndex)}</tr>;
};

const TableCell = ({ value, horizontalAlignment, width, renderColumn, row }) => {
  const cellClasses = {
    [classes.cell]: !renderColumn,
    [classes.render]: renderColumn,
  };
  return (
    <td
      style={{
        minWidth: width,
        width: width,
        textAlign: horizontalAlignment,
      }}
      className={classNames(cellClasses)}
      tabIndex={tabIndex}
      title={value}
    >
      {(renderColumn && (
        <div tabIndex={tabIndex} className={classes.cellRender}>
          {renderColumn(row, value)}
        </div>
      )) ||
        value}
    </td>
  );
};

const SortIcon = ({ sortHandler, field, reset, headerSortHandler }) => {
  const [sortType, setSortType] = useState(sortingType.unsorted);
  useEffect(() => {
    reset && setSortType(sortingType.unsorted);
  }, [reset]);

  const getSortIcon = (sortType) => {
    switch (sortType) {
      case sortingType.ascending:
        return SortedAscending;
      case sortingType.descending:
        return SortedDescending;
      default:
        return Unsorted;
    }
  };
  const getNextType = () => {
    switch (sortType) {
      case sortingType.ascending:
        return sortingType.descending;
      case sortingType.descending:
        return sortingType.unsorted;
      case sortingType.unsorted:
        return sortingType.ascending;
      default:
        return sortingType.unsorted;
    }
  };

  const clickHandler = () => {
    const nextType = getNextType();
    headerSortHandler(field);
    setSortType(nextType);
    sortHandler(nextType, field);
  };
  return (
    <span className={classes.headerIcon} tabIndex={tabIndex} onClick={(e) => clickHandler()}>
      <img
        src={getSortIcon(sortType)}
        alt={`${sortType}-${sortIconSuffix}`}
        title={`${sortType}`}
      />
    </span>
  );
};
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      headerName: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      horizontalAlignment: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  sortHandler: PropTypes.func,
  paginationModal: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    pageSize: PropTypes.number.isRequired,
    totalLength: PropTypes.number.isRequired,
    lastPage: PropTypes.bool,
    onPageChange: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
  }),
  searchBar: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }),
};

export default Table;
