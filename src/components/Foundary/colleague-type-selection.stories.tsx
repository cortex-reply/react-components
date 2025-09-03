import React from "react";
import { ColleagueTypeSelection } from "./colleague-type-selection";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ColleagueTypeSelection> = {
  title: "Digital Colleagues/ColleagueTypeSelection",
  component: ColleagueTypeSelection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ColleagueTypeSelection>;

export const Default: Story = {
  args: {
    onSelectHuman: action('onSelectHuman'),
    onSelectDigital: action('onSelectDigital'),
    onCancel: action('onCancel'),
  },
};
