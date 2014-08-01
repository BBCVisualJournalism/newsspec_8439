module.exports = function (grunt) {
    grunt.config(['replace', 'prepPreviewIntDeploy'], {
        src: ['tmp/*/**.*'],
        overwrite: true,
        replacements: [{
            from: '<%= env.local.domain %>',
            to:   '<%= env.previewint.domain %>'
        }, {
            from: '<%= env.local.domainStatic %>',
            to:   '<%= env.previewint.domainStatic %>'
        }]
    });
    
    grunt.config(['copy', 'intDeploy'], {
        files: [
            {expand: true, cwd: 'tmp', src: ['**'], dest: '<%= env.previewint.mount %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content'}
        ]
    });

    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('previewint', ['prepDeploy', 'replace:prepPreviewIntDeploy', 'copy:intDeploy', 'clean:main']);
};