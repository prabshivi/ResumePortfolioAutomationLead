// Inside your playwright.config.js file
module.exports = defineConfig({
  // ... other configuration setups ...
  webServer: {
    command: 'npx live-server --port=5500',
    url: 'http://127.0.0.1:5500/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: 'http://127.0.0.1:5500',
    trace: 'on-first-retry',
  },
});