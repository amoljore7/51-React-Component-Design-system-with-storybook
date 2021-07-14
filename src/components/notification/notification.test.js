/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Notification from './notification';
import checkIcon from '../../icons/check.svg';

describe('Unit tests for Notification component', () => {
  const infoType = 'info';
  const successType = 'success';
  const errorType = 'error';
  const warningType = 'warning';
  const formErrorType = 'formError';

  const positionTopLeft = 'top-left';
  const positionTopRight = 'top-right';
  const positionBottomLeft = 'bottom-left';
  const positionBottomRight = 'bottom-right';

  let errorList = [
    '- This is a error list toast component.',
    '- This is a error list toast component.',
    '- This is a error list toast component.',
  ];
  it('icon passed in the props appears on the screen', () => {
    const props = {
      icon: checkIcon,
    };
    const { getByRole } = render(<Notification {...props} />);
    expect(getByRole('imageIcon').src).toEqual('http://localhost/check.svg');
  });

  it('Check Top Left Notification', () => {
    const { container } = render(<Notification position={positionTopLeft} />);
    expect(container.firstChild.classList.contains('top-left')).toBe(true);
  });
  it('Check Top Right Notification', () => {
    const { container } = render(<Notification position={positionTopRight} />);
    expect(container.firstChild.classList.contains('top-right')).toBe(true);
  });
  it('Check Bottom Left Notification', () => {
    const { container } = render(
      <Notification position={positionBottomLeft} />
    );
    expect(container.firstChild.classList.contains('bottom-left')).toBe(true);
  });
  it('Check Bottom Right Notification', () => {
    const { container } = render(
      <Notification position={positionBottomRight} />
    );
    expect(container.firstChild.classList.contains('bottom-right')).toBe(true);
  });

  it('Title passed in the props appears on the screen', () => {
    const props = {
      title: 'Submit Error',
    };
    const { getByText } = render(<Notification {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });

  it('form error list passed in the props appears on the screen', () => {
    const props = {
      errorList: errorList,
    };

    const { getAllByTestId } = render(<Notification {...props} />);
    expect(getAllByTestId('errorItem').length).toEqual(3);
  });

  it('Check General Notification', () => {
    const { container } = render(<Notification type={infoType} />);
    expect(container.firstChild.firstChild.classList.contains('info')).toBe(
      true
    );
  });
  it('Check Success Notification', () => {
    const { container } = render(<Notification type={successType} />);
    expect(container.firstChild.firstChild.classList.contains('success')).toBe(
      true
    );
  });
  it('Check Error Notification', () => {
    const { container } = render(<Notification type={errorType} />);
    expect(container.firstChild.firstChild.classList.contains('error')).toBe(
      true
    );
  });
  it('Check Warning Notification', () => {
    const { container } = render(<Notification type={warningType} />);
    expect(container.firstChild.firstChild.classList.contains('warning')).toBe(
      true
    );
  });
  it('Check Form Error Notification', () => {
    const { container } = render(<Notification type={formErrorType} />);
    expect(
      container.firstChild.firstChild.classList.contains('formError')
    ).toBe(true);
  });
});
