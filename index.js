'use strict';

// convert the source code to commonjs modules
var statefulTemplate = require('./dist/index');

module.exports = statefulTemplate.default ?
    statefulTemplate.default :
    statefulTemplate;