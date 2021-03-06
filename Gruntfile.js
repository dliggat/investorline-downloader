module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'helpers/*.js'],
      options: {
        reporter: require('jshint-stylish')
      }
    },
    watch: {
      files: ['.jshintrc', '<%= jshint.files %>'],
      tasks: ['jshint']
    },
    assemble: {
      options: {
        partials: ['partials/*.hbs', 'partials/**/*.hbs'],
        helpers: ['helpers/*.js'],
        data: ['data/*.{json,yml}'],
        ext: '.template'
      },
      site: {
        options: {
          ext: '.html',
          flatten: true,
          layout: ['site/layouts/default.hbs']
        },
        src: ['site/*.hbs'],
        dest: '_output'
      }
    },
    jsbeautifier: {
      files : ['_output/*.template'],
      options : {
        js: {
          indentSize: 2,
          fileTypes: ['.template'],
          maxPreserveNewlines: 2,
          preserveNewlines: true,
          endWithNewline: true
        }
      }
    },
    jsonlint: {
      sample: {
        src: ['_output/*.template']
      }
    },
    cssmin: {
      target: {
        files: {
          '_output/css/styles.css': [
            'bower_components/skeleton/css/*.css',
            'site/css/*.css'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, cwd: 'site/img/', src: '**', dest: '_output/img/', filter: 'isFile' }
        ]
      }
    },
    uglify: {
      options: {
        beautify: true,
        quoteStyle: 1   // Single quotes
      },
      main: {
        files: {
          '_output/javascript/application.js': ['bower_components/jquery/dist/jquery.js', 'site/javascript/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('prepare_site', ['assemble', 'cssmin', 'copy', 'uglify']);
};
