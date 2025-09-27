import React from 'react';
import { ChatCardArtefact } from './ChatCardArtefact';

export default {
  title: 'Chat/ChatCardArtefact',
  component: ChatCardArtefact,
};

const Template = (args) => <ChatCardArtefact {...args} />;

export const Default = Template.bind({});
Default.args = {
  artefact: 'Sample Artefact',
  taskId: 1,
  taskData: {
    id: 1,
    name: 'Sample Task',
    description: 'This is a sample task description.',
    status: 'done',
    dateLogged: new Date().toISOString(),
    project: {
      id: 1,
      name: 'Sample Project',
    },
  },
  loading: false,
  error: null,
};

export const Loading = Template.bind({});
Loading.args = {
  artefact: 'Sample Artefact',
  taskId: 1,
  loading: true,
};

export const Error = Template.bind({});
Error.args = {
  artefact: 'Sample Artefact',
  taskId: 1,
  error: 'Failed to load task data.',
};