/** @format */

module.exports = {
  'insertPragma': true,
  'overrides': [
    {
      'files': '*.svelte',
      'options': {
        'parser': 'svelte',
        'insertPragma': true,
      },
    },
    {
      'files': '*.json',
      'options': {
        'parser': 'json',
        'singleQuote': false,
        'quoteProps': 'preserve',
        'requirePragma': false,
        'insertPragma': false,
      },
    },
  ],
  'plugins': ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  'printWidth': 120,
  'quoteProps': 'preserve',
  'requirePragma': false,
  'singleQuote': true,
};
