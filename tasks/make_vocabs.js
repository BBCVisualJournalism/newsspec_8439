module.exports = function (grunt) {

    var config = grunt.file.readJSON('config.json'),
        cloudfileToVocabConfig = {
            'cloudfile_to_vocab': {}
        },
        mergeJsonConfig = {
            'merge-json': {}
        };

    for (var worksheet in config.vocabs) {
        addToCloudfileToVocabConfig(worksheet);
    }

    addToMergeJsonConfig(config.services.default);
    for (var i = 0; i < config.services.others.length; i++) {
        addToMergeJsonConfig(config.services.others[i]);
    }

    function addToCloudfileToVocabConfig (worksheet) {
        cloudfileToVocabConfig['cloudfile_to_vocab'][worksheet] = {
            options: {
                output_directory:      'source/vocabs/' + worksheet,
                google_spreadsheet_id: '<%= config.vocabs.' + worksheet + '.googleSpreadsheetId %>',
                worksheet:             '<%= config.vocabs.' + worksheet + '.worksheet %>',
                username:              '<%= env.google.username %>',
                password:              '<%= env.google.password %>'
            }
        };        
    }

    function addToMergeJsonConfig (service) {
        mergeJsonConfig['merge-json'][service] = {
            src: ['source/vocabs/passengers/' + service + '.json', 'source/vocabs/crew/' + service + '.json', 'source/vocabs/scaffolding/' + service + '.json'],
            dest: 'source/vocabs/' + service + '.json'
        };;
    }

    grunt.config.merge(cloudfileToVocabConfig);
    grunt.config.merge(mergeJsonConfig);

    grunt.loadNpmTasks('grunt-cloudfile-to-vocab');
    grunt.loadNpmTasks('grunt-merge-json');
    grunt.registerTask('make_vocabs', ['cloudfile_to_vocab:passengers', 'cloudfile_to_vocab:crew', 'cloudfile_to_vocab:scaffolding', 'merge-json']);
};