const webpack = require('webpack')
const path = require('path')

function getApiUrl () {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return ''
    }
    default: {
      return 'http://localhost:3000'
    }
  }
}

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    ...require('./webpack.config'),
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL': JSON.stringify(getApiUrl())
      })
    ]
  },
  outputDir: path.resolve(__dirname, 'dist')
}
