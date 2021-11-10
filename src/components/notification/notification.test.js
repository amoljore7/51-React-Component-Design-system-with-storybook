/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Notification from './notification';

describe.only('Unit tests for Notification component', () => {
  const infoType = 'general';
  const successType = 'success';
  const errorType = 'error';
  const warningType = 'warning';

  it('Title passed in the props appears on the screen', () => {
    const props = {
      title: 'Submit Error',
    };
    const { getByText } = render(<Notification {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });

  it('Check General Notification', () => {
    const { container } = render(<Notification type={infoType} />);
    expect(container.firstChild.firstChild.classList.contains('general')).toBe(
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
});
