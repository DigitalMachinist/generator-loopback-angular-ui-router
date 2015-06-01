/* global describe, beforeEach, it */
'use strict';

var path = require( 'path' );
var yeoman = require( 'yeoman-generator' );
var helpers = yeoman.test;
var assert = yeoman.assert;

describe( 'loopback-angular-ui-router generator test', function () {

  var runGen, options;

  beforeEach( function () {

    options = {
      'skip-install': true
    };

    runGen = helpers
      .run( path.join( __dirname, '../app' ) )
      .inDir( path.join( __dirname, './temp' ) )
      .withGenerators( [ '../../app', [ helpers.createDummyGenerator(), 'mocha:app' ] ] );

  } );

  it( 'creates expected files', function ( done ) {
    var expected = [
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jshintignore',
      '.jshintrc',
      '.travis.yml',
      '.yo-rc.json',
      'bower.json',
      'Gruntfile.js',
      'karma.conf.js',
      'karma-e2e.conf.js',
      'package.json',
      'app/.buildignore',
      'app/.htaccess',
      'app/404.html',
      'app/favicon.ico',
      'app/index.html',
      'app/robots.txt',
      'app/scripts/app.js',
      'app/scripts/controllers/main.js',
      'app/styles/main.css',
      'app/views/main.html',
      'server/config.json',
      'server/datasources.json',
      'server/middleware.json',
      'server/model-config.json',
      'server/server.js',
      'server/boot/authentication.js',
      'server/boot/explorer.js',
      'server/boot/rest-api.js',
      'test/.jshintrc',
      'test/runner.html',
      'test/spec/controllers/main.js'
    ];

    runGen.withOptions( options ).on( 'end', function () {
      assert.file( expected );
      done();
    } );

  } );
} );