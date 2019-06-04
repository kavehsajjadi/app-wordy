import { configure } from '@storybook/react'


// const stories = require.context('../src', true, /.stories.tsx$/);
const story = require.context('../src', true, /.story.tsx$/);

function loadStories() {
  // stories.keys().forEach(stories);
  story.keys().forEach(story);
}

configure(loadStories, module)