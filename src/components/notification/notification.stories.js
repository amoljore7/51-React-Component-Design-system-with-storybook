import Notification from './notification.jsx';
import checkIcon from '../../icons/check.svg';
import errorIcon from '../../icons/error.svg';
import infoIcon from '../../icons/info.svg';
import warningIcon from '../../icons/warning.svg';

export default {
  title: 'design-components/Notification',
  component: Notification,
  argTypes: {
    position: {
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      control: { type: 'radio' },
    },
  },
};
const InfoTemplate = (args) => <Notification {...args} />;
export const Info = InfoTemplate.bind({});
Info.args = {
  type: 'info',
  duration: 9000,
  title: 'this is a general message',
  icon: infoIcon,
  position: 'top-left',
};

const SuccessTemplate = (args) => <Notification {...args} />;
export const Success = SuccessTemplate.bind({});
Success.args = {
  type: 'success',
  title: 'this is a success message',
  icon: checkIcon,
  position: 'top-right',
};

const ErrorTemplate = (args) => <Notification {...args} />;
export const Error = ErrorTemplate.bind({});
Error.args = {
  type: 'error',
  title: 'this is an error message',
  icon: errorIcon,
  position: 'bottom-left',
};

const WarningTemplate = (args) => <Notification {...args} />;
export const Warning = WarningTemplate.bind({});
Warning.args = {
  type: 'warning',
  title: 'this is an alert message',
  icon: warningIcon,
  position: 'bottom-right',
};
const linkTemplate = (args) => <Notification {...args} />;
export const Link = linkTemplate.bind({});
Link.args = {
  type: 'warning',
  title: 'this is an alert message.',
  link: 'https://www.w3schools.com',
  text: 'more info',
  icon: warningIcon,
  position: 'top-right',
};

const FormSubmitErrorTemplate = (args) => <Notification {...args} />;
export const FormError = FormSubmitErrorTemplate.bind({});
FormError.args = {
  type: 'formError',
  title: 'Submit Error',
  icon: errorIcon,
  position: 'top-left',
  errorList: [
    '- This is a error list toast component.',
    '- This is a error list toast component.',
    '- This is a error list toast component.',
  ],
};
