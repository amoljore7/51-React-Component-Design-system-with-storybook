import Button from "./Button";
import circularIcon from "../icons/icon.png";

export default {
  title: "Button Components",
  component: Button,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "textOnly"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    backgroundColor: { control: "color" },
  },
};

const onClickEvent = () => {
  alert("Button clicked");
};

const Template = (args) => (
  <Button onClick={onClickEvent} {...args}>
    <img src={circularIcon} style={{ marginRight: "0.5rem" }} />
    Button
  </Button>
);
export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  variant: "primary",
  size: "large",
};

const Template1 = (args) => (
  <Button onClick={onClickEvent} {...args}>
    Button
  </Button>
);
export const ButtonWithoutIcon = Template1.bind({});
ButtonWithoutIcon.args = {
  size: "large",
};

// export const Large = () => <Button size="large">Button</Button>;
