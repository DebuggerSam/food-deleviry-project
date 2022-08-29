'use strict';

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/app.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/js',
    },

    watch: true,

    devtool: 'source-map',

    module: {},
};