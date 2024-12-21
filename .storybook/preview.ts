import type { Preview } from '@storybook/react';

import '../src/assets/styles/app.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: { title: 'Table of Contents' },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
