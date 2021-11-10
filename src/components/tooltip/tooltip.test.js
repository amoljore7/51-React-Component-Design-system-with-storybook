import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Tooltip from './';

describe('Tooltip component unit test cases', () => {
  it('Check Button Primary', () => {
    render(
      <Tooltip title="Submit form" position="top">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );

    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);

    const tooltip = document.getElementsByClassName('bds-tooltip-container')[0];
    expect(tooltip).toBeInTheDocument();
  });
});
