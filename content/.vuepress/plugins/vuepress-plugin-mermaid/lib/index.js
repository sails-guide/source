const path = require('path')

module.exports = {
  // enhanceAppFiles: path.resolve(__dirname, 'enhance-app.js'),

  chainMarkdown (config) {
    config
      .plugin('flowchart')
      .use(require('./md-plugin'))
  }
}
