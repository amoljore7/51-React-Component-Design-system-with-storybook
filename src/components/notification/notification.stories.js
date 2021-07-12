import Toast from './notification.jsx';

import checkIcon from '../../icons/check.svg';
import errorIcon from '../../icons/error.svg';
import infoIcon from '../../icons/info.svg';
import warningIcon from '../../icons/warning.svg';

export default {
  title: 'design-components/Notification',
  component: Toast,
  argTypes: {
    position: {
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      control: { type: 'radio' },
    },
  },
};
const InfoTemplate = (args) => <Toast {...args} />;
export const Info = InfoTemplate.bind({});
Info.args = {
  type: 'info',
  duration: 5000,
  description: 'this is a general message',
  icon: infoIcon,
  position: 'top-right',
};

const SuccessTemplate = (args) => <Toast {...args} />;
export const Success = SuccessTemplate.bind({});
Success.args = {
  type: 'success',
  description: 'this is a success message',
  icon: checkIcon,
  position: 'top-left',
};

const ErrorTemplate = (args) => <Toast {...args} />;
export const Error = ErrorTemplate.bind({});
Error.args = {
  type: 'error',
  description: 'this is an error message',
  icon: errorIcon,
  position: 'bottom-left',
};

const WarningTemplate = (args) => <Toast {...args} />;
export const Warning = WarningTemplate.bind({});
Warning.args = {
  type: 'warning',
  description: 'this is an alert message',
  icon: warningIcon,
  position: 'bottom-right',
};

const FormSubmitErrorTemplate = (args) => <Toast {...args} />;
export const FormError = FormSubmitErrorTemplate.bind({});
FormError.args = {
  type: 'formError',
  title: 'Submit Error',
  icon: errorIcon,
  position: 'bottom-left',
  errorList: [
    '- This is a error list toast component.',
    '- This is a error list toast component.',
    '- This is a error list toast component.',
  ],
};
