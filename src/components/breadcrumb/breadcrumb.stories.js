import React from 'react';
import Breadcrumb from './breadcrumb';

export default {
  title: 'design-components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    linkToNameList: [],
    clickHandler: {action: 'clicked'}
  },
};

const BreadcrumbTemplate = (args) => <Breadcrumb {...args} />;
export const BreadcrumbGroup = BreadcrumbTemplate.bind({});
BreadcrumbGroup.args = {
  linkToNameList: [
    {
      link: '#',
      name: 'Breadcrumb1',
    },
    {
      link: '#',
      name: 'Breadcrumb2',
    },
    {
      link: '#',
      name: 'Breadcrumb3',
    },
  ],
};

const BreadCrumbClickedTemplate = (args) =>  <Breadcrumb {...args}/>
export const BreadCrumbWithClickHandler = BreadCrumbClickedTemplate.bind({});
BreadCrumbWithClickHandler.args = {
  linkToNameList : [
    {
      link: '#',
      name: 'Breadcrumb1',
    },
    {
      link: '#',
      name: 'Breadcrumb2',
    },
    {
      link: '#',
      name: 'Breadcrumb3',
    },
  ],
  clickHandler: (event) => {
    event.preventDefault();
    // add your routing logic here
    alert('The link:' + event.currentTarget.getAttribute('href') + ' with name:' + event.currentTarget.innerText + ' was clicked')
  }
}

export const BreadcrumbWithOverflow = BreadcrumbTemplate.bind({});
BreadcrumbWithOverflow.args = {
  linkToNameList: [
    {
      link: '#',
      name: 'Breadcrumb1',
    },
    {
      link: '#',
      name: 'Breadcrumb2',
    },
    {
      link: '#',
      name: 'Breadcrumb3',
    },
    {
      link: '#',
      name: 'Breadcrumb4',
    },
    {
      link: '#',
      name: 'Breadcrumb5',
    },
  ],
  clickHandler: (event) => {
    event.preventDefault();
    // add your routing logic here
  }
};
