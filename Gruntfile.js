/*
Grunt installation:
-------------------
  npm install -g grunt-cli
  npm install -g grunt-init
  npm init (creates a `package.json` file)

Grunt docs:
-----------
http://gruntjs.com/getting-started

*/

module.exports = function(grunt) {

  // Displays the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);
  
  grunt.initConfig({
  
    // Store your Package file so you can reference its specific data whenever necessary
    pkg: grunt.file.readJSON('package.json'),
    
    // Docs - https://github.com/sindresorhus/grunt-sass
    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },
    
    // Docs - https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      main: {
        files: [
          {src: ['bower_components/jquery/jquery.min.js'], dest: 'js/jquery.min.js', filter: 'isFile'},
          {src: ['bower_components/foundation/js/foundation.min.js'], dest: 'js/foundation.min.js', filter: 'isFile'},
          {src: ['bower_components/modernizr/modernizr.js'], dest: 'js/modernizr.js', filter: 'isFile'}
        ]
      }
    },
    
    // Docs - https://github.com/dannygarcia/grunt-jekyll
    jekyll: {
      dev: {
        options: {
          serve: true,
          watch: true
        }
      },
      build: {
        options: {
          serve: false
        }
      }
    },
    
    // Docs - https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev']
      }
    },
    
    // Docs - https://github.com/sindresorhus/grunt-concurrent
    concurrent: {
      tasks: ['watch:sass', 'jekyll:dev'],
      options: {
        logConcurrentOutput: true
      }
    }
    
  });
  
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['sass:dev', 'jekyll:build', 'copy']);
  grunt.registerTask('default', ['concurrent']);
}