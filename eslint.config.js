// eslint.config.js

// No lint rule currently added to this file as it is not my source to decide the styling.
// Fill free to choose a style or add rules

/** @type {import('eslint').Linter.Config} */
const config = [
  {
    files: ['*.js'],  // Targeting JavaScript files
    languageOptions: {
      globals: {
        browser: true, // Indicating globals in a browser environment
        node: true,    // Indicating globals in a Node.js environment
        es2021: true,  // Allow the features of ES2021
      },
      parserOptions: {
        ecmaVersion: 12,   // ES2021
        sourceType: 'module', // ES Module support
      },
    },
    rules: {
      'semi': ['error', 'always'],      // Enforcing semicolons
      'no-unused-vars': 'error',        // Error on unused variables
      'no-console': 'warn',             // Warn on console usage
      'quotes': ['error', 'single'],   // Enforcing single quotes
    },
  },
];

module.exports = config;
