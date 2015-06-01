var fs     = require( 'fs' );
var path   = require( 'path' );
var chalk  = require( 'chalk' );
var util   = require( 'util' );
var yeoman = require( 'yeoman-generator' );

module.exports = yeoman.generators.Base.extend( {

  constructor: function () {
    yeoman.generators.Base.apply( this, arguments );

  },

  install: function () {
  	
    var prompts = [];

    this.name = 'loopback-angular-ui-router';

    this.files = this.expandFiles( '**/*', {
      cwd: this.sourceRoot( path.resolve( __dirname, '../node_modules/loopback-angular-ui-router' ) ),
      dot: true
    } );

    var ignores = [
		  '.git',
		  'README.html'
		];

    this.files.forEach( 
    	function ( file ) {
	      if ( ignores.indexOf( file ) !== -1 ) {
	        return;
	      }
	      this.copy( file, file );
    	}, 
    	this 
    );

    this.config.save();

    this.package = JSON.parse( this.readFileAsString( path.resolve( __dirname, '../package.json' ) ) );

    this.log.writeln( 'Generating from ' + chalk.cyan( 'loopback-angular-ui-router' ) + ' v' + chalk.cyan( this.package.version ) + '...' );
  }

} );