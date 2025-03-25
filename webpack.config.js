const path = require('path');

module.exports = {
  entry: {
    login: './src/pages/login.ts',
    register: './src/pages/register.ts',
    dashboard: './src/pages/dashboard.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
