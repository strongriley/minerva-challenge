WordsModel = Backbone.Model.extend({
    url: 'static/words.txt',

    initialize: function() {
        _.bindAll(this);
        // Pre-populate everything
        this.fetch({
            dataType: "text"
        });
    },

    parse: function(text, options) {
        this.trigger('parse');
        /* Builds a tree out of each letter.
         * For example, the word "and" could be found at position...
         * a.children.n.children.d
         * 
         * This will make finding matching words much more straight-forward.
         */
        var words, tree;
        words = text.split("\n");
        tree = {};
        _.each(words, function(word) {
            word = word.toLowerCase();
            // Reset tree position.
            // TODO more efficient to keep track of position in the tree.
            var pos = tree;

            var i = 0;
            var length = word.length;
            _.each(word, function(letter) {
                // Walk down tree for each letter.
                // Once word is complete, mark it as a whole word.
                if (pos[letter] == undefined) {
                    pos[letter] = {children: {}};
                }
                pos = pos[letter];
                i++;
                if (i == length) {
                    pos.word = true;
                } else {
                    pos = pos.children;
                }
            });
        });
        return {tree: tree};
    },

    error: function(model, xhr, options) {
        console.log(xhr);
        console.log(options);
    }
});
