import { defineConfig } from 'cypress';
// Populate process.env with values from .env file
require('dotenv').config();

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true,
  },
  env: {
    backendUrl: process.env.PROXY_BACKEND,
    USE_MOCKS: false,
  },
});
