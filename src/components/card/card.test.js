/* eslint-disable no-undef */
import Card from './card';
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('card test cases', () => {
  it('title passed in the props appears on the screen', () => {
    const props = {
      image:
        'https://media-exp1.licdn.com/dms/image/C560BAQEp7H79CM1XSg/company-logo_200_200/0/1621376300395?e=2159024400&v=beta&t=blE1LaLSAeEh_YoAvPfXeYElBDwYZQDWw6q1ZkE0YKs',
      title: 'Britive',
    };
    const { getByText } = render(<Card {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });
  it('image passed in the props appears on the screen', () => {
    const props = {
      image:
        'https://media-exp1.licdn.com/dms/image/C560BAQEp7H79CM1XSg/company-logo_200_200/0/1621376300395?e=2159024400&v=beta&t=blE1LaLSAeEh_YoAvPfXeYElBDwYZQDWw6q1ZkE0YKs',
      title: 'Britive',
    };
    const { getByRole } = render(<Card {...props} />);
    expect(getByRole('image').src).toEqual(props.image);
  });
});
