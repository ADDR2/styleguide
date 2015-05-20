var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(disallowObjectCreation) {
        assert(
            disallowObjectCreation === true,
            'disallowObjectCreation option requires a value of true or should be removed.'
        );
    },

    getOptionName: function() {
        return 'disallowObjectCreation';
    },

    check: function(file, errors) {

        file.getLines().forEach(function(line, i) {
            var objectCreation = "new Object()";
            var index = line.search(objectCreation);
            if (index > -1) {
                errors.add(
                    'Use the literal syntax for object creation.',
                    i + 1, index
                );
            }
        });

    }
};