const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV, 
    module: {
        rules: [
            { test: /\.jsx?$/,
              exclude: /(node_modules)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env', '@babel/preset-react'],
                      plugins: ['@babel/plugin-proposal-class-properties']
                  }
              }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devServer: {
        publicPath: '/build',
        proxy: {
            '/': 'http://localhost:3000',
            '/location': 'http://localhost:3000/location',
            '/messages': 'http://localhost:3000/messages'
        }   
    }
}