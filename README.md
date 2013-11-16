# grunt-fay

> Compile Haskell code to JavaScript using Fay

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fay --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fay');
```

## The "fay" task

### Overview
In your project's Gruntfile, add a section named `fay` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fay: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```


### Usage Examples

In this example, the file `hello_world.hs` in the `src` directory is compiled to `hello_world.js` in the `dest` directory.

```js
grunt.initConfig({
  fay: {
    files: {
      'dest/hello_world.js': 'src/hello_world.hs',
    },
  },
})
```
