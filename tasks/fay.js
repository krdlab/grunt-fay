/*
 * grunt-fay
 * https://github.com/Matt/Fay
 *
 * Copyright (c) 2013 Matt Kaemmerer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var async = require('async');
  var numCPUs = require('os').cpus().length;

  grunt.registerMultiTask('fay', 'Compile Fay code to JavaScript', function() {
    var cb = this.async();
    var options = this.options();

    // Iterate over all specified file groups.
    async.eachLimit(this.files, numCPUs, function (file, next) {
      var src = file.src[0];
      var args = [];

      if (typeof src !== 'string') {
        src = file.orig.src[0];
      }
      if (!grunt.file.exists(src)) {
        grunt.log.warn('Source file "' + src + '" not found.');
        return next();
      }

      // Make sure grunt creates the destination folders
      grunt.file.write(file.dest, '');

      args = [
        src,
        "-o", file.dest
      ];

      //Run fay
      grunt.util.spawn({
        cmd: 'fay',
        args: args,
        opts: {
          stdio: 'inherit'
        }
      }, function (error, result, code) {
        if (code === 127) {
          return grunt.warn(
            'You need to have Fay installed and in your PATH for\n' +
            'this task to work. More info:\n' +
            'https://github.com/gruntjs/grunt-contrib-sass'
          );
        }

        grunt.log.writeln('File "' + file.dest + '" created.');
        next(error);
      });
    }, cb);
  });

};
