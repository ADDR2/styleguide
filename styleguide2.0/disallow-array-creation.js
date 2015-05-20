var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(disallowArrayCreation) {
        assert(
            disallowArrayCreation === true,
            'disallowArrayCreation option requires a value of true or should be removed.'
        );
    },

    getOptionName: function() {
        return 'disallowArrayCreation';
    },

    check: function(file, errors) {

        file.getLines().forEach(function(line, i) {
            var arrayCreation = "new Array()";
            var index = line.search(arrayCreation);
            if (index > -1) {
                errors.add(
                    'Use the literal syntax for array creation.',
                    i + 1, index
                );
            }
        });

    }
};