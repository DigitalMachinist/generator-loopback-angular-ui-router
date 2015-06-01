'use strict';

var path   = require( 'path' );
var util   = require( 'util' );
var yeoman = require( 'yeoman-generator' );
var yosay  = require( 'yosay' );

var CustomGenerator = module.exports = function CustomGenerator( args, options, config ) {

  yeoman.generators.Base.apply( this, arguments );
  this.pkg = JSON.parse( this.readFileAsString( path.join( __dirname, '../package.json' ) ) );

};

util.inherits( CustomGenerator, yeoman.generators.Base );

CustomGenerator.prototype.prompting = function prompting () {

  // Let Yeoman welcome the user.
  console.log( yosay() );

  var prompts = [
    {
      name: 'projectName',
      message: 'What would you like to call your project?'
    }
  ];

  var callback = this.async();
  this.prompt( prompts, function ( answers ) {

    this.projectName = answers.projectName;
    callback();

  }.bind( this ) );

};

CustomGenerator.prototype.install = function install () {

  var sourcePath = this.sourceRoot( path.resolve( __dirname, '../node_modules/loopback-angular-ui-router' ) );
  
  // Copy whole directories.
  this.directory( path.join( sourcePath, 'app' ),     path.join( this.projectName, 'app' )    );
  this.directory( path.join( sourcePath, 'server' ),  path.join( this.projectName, 'server' ) );
  this.directory( path.join( sourcePath, 'test' ),    path.join( this.projectName, 'test' )   );

  // List out the files to copy.
  var files = [
    '.bowerrc',
    '.editorconfig',
    '.gitattributes',
    '.jshintignore',
    '.jshintrc',
    '.travis.yml',
    '.yo-rc.json',
    'bower.json',
    'Gruntfile.js',
    'karma.conf.js',
    'karma-e2e.conf.js',
    'package.json'
  ];

  // Copy all of the files to the destination.
  var self = this;
  files.forEach( function ( filePath ) {
    self.copy( 
      path.join( sourcePath, filePath ), 
      path.join( self.projectName, filePath )
    );
  } );

  // Copy the .gitignore since it's named weirdly to prevent npm from removing it.
  self.copy( 
    path.join( sourcePath, '_.gitignore' ), 
    path.join( self.projectName, '.gitignore' )
  );

};

CustomGenerator.prototype.end = function end () {

  // Change into the generated folder.
  process.chdir( path.join( process.cwd(), this.projectName ) );

  // Install dependencies with npm/bower.
  var self = this;
  self.installDependencies( {
    bower: true,
    npm: true,
    skipInstall: false,
    callback: function () {
      self.spawnCommand( 'grunt', [ 'build', '--base ./' + self.projectName ] );
    }
  } );

};