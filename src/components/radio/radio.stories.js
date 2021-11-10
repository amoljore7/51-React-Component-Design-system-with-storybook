import RadioGroup from './radio';

export default {
  title: 'design-components/RadioButton',
  component: RadioGroup,
  argTypes: {
    options: [],
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

const RadioGroupTemplate = (args) => <RadioGroup {...args} />;
export const RadioButtonGroup = RadioGroupTemplate.bind({});
RadioButtonGroup.args = {
  label: 'Gender',
  name: 'gender',
  defaultValue: 'male',
  options: [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
      disabled: false,
    },
    {
      label: 'Other',
      value: 'other',
      disabled: true,
    },
  ],
  direction: 'horizontal',
};

RadioButtonGroup.args.onChange = function (event) {
  event.preventDefault();
  console.log(event.target.value);
};
