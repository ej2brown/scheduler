import { configure } from "@storybook/react";

function loadStories() {
  require("../stories");
}

configure(loadStories, module);



/* 
main.js
*/
module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
