import Button from './button.jsx';
import circularIcon from '../../icons/circle.svg';

export default {
  title: 'design-components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'textOnly'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
};

const ButtonWithIconTemplate = (args) => (
  <Button {...args} onClick={() => alert('Button clicked')}>
    <img src={circularIcon} alt="icon" style={{ marginRight: '0.5rem' }} />
    Button
  </Button>
);
export const ButtonWithIcon = ButtonWithIconTemplate.bind({});
ButtonWithIcon.args = {
  variant: 'primary',
  size: 'large',
};

const ButtonWithoutIconTemplate = (args) => (
  <Button {...args} onClick={() => alert('Button clicked')}>
    Button
  </Button>
);
export const ButtonWithoutIcon = ButtonWithoutIconTemplate.bind({});
ButtonWithoutIcon.args = {
  size: 'large',
};
