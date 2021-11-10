/* eslint-disable no-undef */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Tree from './tree';
import { TreeNodeClasses } from './constants';
describe('Unit tests for Tree component', () => {
  const data = {
    root: 'All Secrets',
    nodes: [
      {
        root: 'Project A',
        nodes: [
          {
            root: 'Dev',
            nodes: [
              {
                root: 'DB',
                leaves: ['My SQL', 'Oracle'],
              },
            ],
            leaves: ['Secret 777'],
          },
          {
            root: 'UAT',
          },
        ],
        leaves: ['Secret 1', 'Secret 2', 'Secret 3', 'Secret 4'],
      },
      {
        root: 'Project B',
        nodes: [],
      },
      {
        root: 'Project C',
        nodes: [],
      },
    ],
  };

  it('To render the top level node intitally', () => {
    render(<Tree data={data} clickHandler={() => {}} />);
    expect(
      document.getElementsByClassName(TreeNodeClasses.parentContainer)
    ).toHaveLength(1);
  });

  it('To Expand on clicking and show first three level nodes', () => {
    render(<Tree data={data} clickHandler={() => {}} />);
    let parentNodeContainer = document.getElementsByClassName(
      TreeNodeClasses.parentContainer
    );
    fireEvent.click(
      document.querySelector(`.${TreeNodeClasses.dirIconContainer} > svg`)
    );
    parentNodeContainer = document.getElementsByClassName(
      TreeNodeClasses.parentContainer
    );
    expect(parentNodeContainer).toHaveLength(4);
  });

  it('To Expand second item and show the leaf nodes', () => {
    const clickHandler = jest.fn();
    render(<Tree data={data} clickHandler={clickHandler} />);
    fireEvent.click(
      document.querySelector(`.${TreeNodeClasses.dirIconContainer} > svg`)
    );
    const expandedNode = document.getElementsByClassName(
      TreeNodeClasses.dirIconContainer
    );
    fireEvent.click(expandedNode[1]);
    expect(clickHandler).toBeCalled();
    const leafNodes = document.getElementsByClassName(
      TreeNodeClasses.contentBoxContainer
    );
    expect(leafNodes).toHaveLength(4);
  });
});

const data = {
  root: 'All Secrets',
  nodes: [
    {
      root: 'Project A',
      nodes: [
        {
          root: 'Dev',
          nodes: [
            {
              root: 'DB',
              leaves: ['My SQL', 'Oracle'],
            },
          ],
          leaves: ['Secret 777'],
        },
        {
          root: 'UAT',
        },
      ],
      leaves: ['Secret 1', 'Secret 2', 'Secret 3', 'Secret 4'],
    },
    {
      root: 'Project B',
      nodes: [],
    },
    {
      root: 'Project C',
      nodes: [],
    },
  ],
};
