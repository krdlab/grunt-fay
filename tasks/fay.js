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

  var arrayOptions = {
    htmlJsLib: "--html-js-lib",
    include: "--include",
    'package': "--package",
    strict: "--strict"
  };

  var argumentOptions = {
    packageConf: "--package-conf",
    basePath: "--base-path",
    runtimePath: "--runtime-path"
  };

  var flagOptions = {
    library: "--library",
    flattenApps: "--flatten-apps",
    htmlWrapper: "--html-wrapper",
    wAll: "--Wall",
    noGhc: "--no-ghc",
    stdout: "--stdout",
    pretty: "--pretty",
    optimize: "--optimize",
    closure: "--closure",
    noRts: "--no-rts",
    noStdlib: "--no-stdlib",
    printRuntime: "--print-runtime",
    stdlib: "--stdlib",
    typecheckOnly: "--typecheck-only",
    sourcemap: "--sourcemap"
  };

  grunt.registerMultiTask('fay', 'Compile Haskell code to JavaScript with Fay', function() {
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

      // Create fay's options
      args = args.concat(createArgs(src, file.dest, options));

      // Run fay
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
            'https://github.com/mkaemmerer/grunt-fay'
          );
        }

        grunt.log.writeln('File "' + file.dest + '" created.');
        next(error);
      });
    }, cb);
  });

  var createArgs = function(src, dest, options) {
    var args = [];

    args.push(src);
    args.push("--output=" + dest);

    for (var flag in flagOptions) {
      if (flagOptions.hasOwnProperty(flag)) {
        if (options[flag] === true) {
          args.push(flagOptions[flag]);
        }
      }
    }

    for (var arg in argumentOptions) {
      if (argumentOptions.hasOwnProperty(arg)) {
        if (typeof options[arg] === "string") {
          args.push(argumentOptions[arg] + "=" + options[arg]);
        }
      }
    }

    for (var arr in arrayOptions) {
      if (arrayOptions.hasOwnProperty(arr)) {
        var option = options[arr];
        if (Array.isArray(option)) {
          args.push(arrayOptions[arr] + "=" + option.join(','));
        } else if (typeof option === "string") {
          args.push(arrayOptions[arr] + "=" + option);
        }
      }
    }

    return args;
  };

};
