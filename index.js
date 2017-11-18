'use strict';

// convert the source code to commonjs modules
var statefulTemplate = require('./index.jsx');

module.exports = statefulTemplate.default ?
    statefulTemplate.default :
    statefulTemplate;