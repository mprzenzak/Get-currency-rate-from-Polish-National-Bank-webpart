// 'use strict';

// const gulp = require('gulp');
// const build = require('@microsoft/sp-build-web');
// build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// build.initialize(gulp);


'use strict';
var gulp = require('gulp');
const build = require('@microsoft/sp-build-web');


gulp.task('default', function() {
    // Code for the default task
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(gulp);
