import React from 'react';
import Select from './select';

export default {
  title: 'design-components/Select',
  component: Select,
};

export const DropdownWithLabelAndHelperText = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    placeholder: 'Choose an option',
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const Disabled = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    disabled: true,
    value: { title: 'secret-delete' },
    placeholder: 'Choose An Option',
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const Error = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    error: true,
    errorMessage:
      "You can't choose this action. Actions can only be chosen from pre-defined list of action",
    value: { title: 'secret-delete' },
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const ReadOnly = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    readOnly: true,
    value: { title: 'secret-delete' },
    width: '300px',
    label: 'Actions',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const WithoutLabel = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    value: { title: 'secret-delete' },
    width: '300px',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const Inline = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    inline: true,
    value: { title: 'secret-delete' },
    width: '300px',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const SmallDropdown = () => {
  const props = {
    width: '56px',
    size: 'small',
    options: [10, 20, 30, 40],
    value: 10,
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option;
    },
  };
  return <Select {...props} />;
};
