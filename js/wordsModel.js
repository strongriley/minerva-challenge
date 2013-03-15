WordsModel = Backbone.Model.extend({
    url: 'static/words.txt',

    initialize: function() {
        _.bindAll(this);
        // Pre-populate everything
        this.fetch({
            dataType: "text",
            error: this.error
        });
    },

    parse: function(text, options) {
        /* Builds a tree out of each letter.
         * For example, the word "and" could be found at position...
         * a.children.n.children.d
         * 
         * This will make finding matching words much more straight-forward.
         */
        var words, tree;
        words = text.split("\n");
        // TODO debug
        var limit = 100;
        var j = 0;

        tree = {};
        _.each(words, function(word) {
            // TODO debugging code
            if (j > limit) {
                return;
            }
            j++;

            word = word.toLowerCase();

            // TODO more efficient to keep track of position in the tree.
            var pos = tree;  // Always back to the top for each new word.

            var i = 0;
            var length = word.length;
            _.each(word, function(letter) {
                // increment beforehand for simpler determination that we're
                // at the end.
                i++;
                if (pos[letter] == undefined) {
                    pos[letter] = {children: {}};
                }
                if (i == length) {
                    pos.word = true;
                } else {
                    pos = pos[letter].children;
                }
            });
        });

        return tree;
    },

    error: function(model, xhr, options) {
        console.log(xhr);
        console.log(options);
    }
});
