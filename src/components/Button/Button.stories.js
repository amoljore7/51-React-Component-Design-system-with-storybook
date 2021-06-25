import Button from "./Button";
import circularIcon from "../icons/icon.png";

export default {
  title: "Button Components",
  component: Button,
  argTypes: {
    variant: {
      options: ["btn-primary", "btn-secondary", "btn-textOnly"],
      control: { type: "radio" },
    },
    size: {
      options: ["btn-small", "btn-medium", "btn-large"],
      control: { type: "radio" },
    },
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => (
  <Button {...args}>
    {/* <img src={circularIcon} style={{ marginRight: "0.5rem" }} /> */}
    Button
  </Button>
);
export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  variant: "btn-primary",
  size: "btn-large",
};

const Template1 = (args) => <Button {...args}>Button</Button>;
export const ButtonWithoutIcon = Template1.bind({});
ButtonWithoutIcon.args = {
  size: "btn-large",
};

// export const Large = () => <Button size="large">Button</Button>;
