import Textfield from './textfield';
export default {
  title: 'design-components/Textfield',
  component: Textfield,
};

const Template = (args) => <Textfield {...args} />;
export const Success = Template.bind({});
Success.args = {
  type: 'text',
  value: 'this is a message',
  label: 'Email',
  subLabel: 'Enter email address',
  helperText: 'Some important text',
  variant: 'outlined',
  disabled: false,
};
