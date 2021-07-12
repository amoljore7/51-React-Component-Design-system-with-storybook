import React from 'react';

import Card from './card';

export default {
  title: 'design-components/Card',
  component: Card,
};

const CardTemplate = (args) => <Card {...args} />;

export const CardWithImageAndTitle = CardTemplate.bind({});
CardWithImageAndTitle.args = {
  title: 'Britive',
  image:
    'https://media-exp1.licdn.com/dms/image/C560BAQEp7H79CM1XSg/company-logo_200_200/0/1621376300395?e=2159024400&v=beta&t=blE1LaLSAeEh_YoAvPfXeYElBDwYZQDWw6q1ZkE0YKs',
  clickHandler: (event) => {
    event.preventDefault();
    alert(`Card with title Britive has been clicked`);
  },
};
