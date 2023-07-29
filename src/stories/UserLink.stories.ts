// UserLink.stories.ts

import type { Meta, StoryObj } from '@storybook/svelte';
import UserLink from '$lib/components/UserLink.svelte';

const meta = {
  component: UserLink,
  title: 'Components/UserLink',
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: ['github', 'twitter', 'linkedin', 'facebook', 'tiktok', 'custom'],
    },
  },
} satisfies Meta<UserLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GitHub: Story = {
  args: {
    icon: 'github',
    url: 'https://github.com',
    title: 'GitHub',
  },
};

export const Twitter: Story = {
  args: {
    icon: 'twitter',
    url: 'https://twitter.com',
    title: 'Twitter',
  },
};

export const LinkedIn: Story = {
  args: {
    icon: 'linkedin',
    url: 'https://linkedin.com',
    title: 'LinkedIn',
  },
};

export const Facebook: Story = {
  args: {
    icon: 'facebook',
    url: 'https://facebook.com',
    title: 'Facebook',
  },
};

export const TikTok: Story = {
  args: {
    icon: 'tiktok',
    url: 'https://tiktok.com',
    title: 'TikTok',
  },
};

export const Custom: Story = {
  args: {
    icon: 'custom',
    url: 'https://example.com',
    title: 'Custom',
  },
};
