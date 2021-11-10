/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Sidebar from './sidebar';

describe('Unit tests for Sidebar component', () => {

  const sidebarData = [
    {
      GroupHeader: 'Britive Vault',
      items: [
        {
          title: 'Britive Vault',
          route: '/',
          icon: '',
        },
        {
          title: 'Approvals',
          route: '/approvals',
          icon: '',
        },
      ],
    },
  ];

  it('menu title passed in the props appears on the screen', () => {
    const props = {
      menuTitle: 'Secrets Manager',
    };
    const { getByText } = render(<Sidebar {...props} />);
    expect(getByText(props.menuTitle)).toBeInTheDocument();
  });
  it('sidebar toggele button pass', () => {
    const { container } = render(<Sidebar open={true} />);
    expect(container.firstChild.classList.contains('true')).toBeTruthy;
  });
  it('There are two items in the sidebar', () => {
    const { getByRole } = render(
      <Sidebar sidebarData={sidebarData} />
    );
    expect(getByRole('listRole').length).toEqual(2);
  });
});
