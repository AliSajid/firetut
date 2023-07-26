module.exports = {
  "insertPragma": true,
  "overrides": [
    {
      "files": "*.svelte",
      "options": {
        "parser": "svelte",
      },
    },
    {
      "files": "*.json",
      "options": {
        "parser": "json",
        "singleQuote": false,
        "quoteProps": "preserve",
        "requirePragma": false,
        "insertPragma": false
      },
    }
  ],
  "plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  "pluginSearchDirs": ["."],
  "printWidth": 120,
  "quoteProps": "preserve",
  "requirePragma": true,
  "singleQuote": true
}
