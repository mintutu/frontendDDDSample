module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', './public/min/app.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        babel: {
            options: {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react', 'stage-0']
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: './app/applications/components/',
                    src: ['*.jsx'],
                    dest: './public/min-safe/js/', // Custom folder
                    ext: '.js'
                }]
            }
        },
        concat: {
            js: { //target
                src: [
                    './app/app.js',
                    './app/applications/controllers/Controller.js',
                    ['./app/applications/controllers/*.js', '!Controller.js'],
                    './public/min-safe/js/*.js'
                ],
                dest: './public/min/app.js'
            }
        },
    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-babel');

    //register grunt default task
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify', 'babel']);
};