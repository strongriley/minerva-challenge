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

    search: function(args) {
        var profile, tree, tree, used, self;
        self = this;
        profile = {};

        this.trigger('search');
        this.set('start', new Date());

        // Generate profile of the letters given.
        letters = args.letters.toLowerCase();
        _.each(letters, function(letter) {
            self.incrementLetter(profile, letter);
        });
        // Additional constraints around search.
        this.set({
            startingLetter: args.startingLetter.toLowerCase(),
            wordSizeMin: parseInt(args.wordSizeMin, 10) || null,
            wordSizeMax: parseInt(args.wordSizeMax, 10) || null
        });

        // Walk the tree
        tree = this.get('tree');
        used = {};  // As traversing tree, keep track of letters used.
        this.set('word', "");
        this.checkTree(tree, profile, used);
        this.set('end', new Date());
        console.log(this.get('end') - this.get('start'));
        this.trigger('searchComplete');
    },

    checkTree: function(tree, profile, used) {
        var self = this;
        var min = self.get('wordSizeMin');
        var max = self.get('wordSizeMax');
        var startingLetter = self.get('startingLetter');
        _.each(tree, function(subtree, letter) {
            var word = self.get('word')
            // Filter tree
            if (profile[letter] == undefined) return false;
            if (used[letter] && used[letter] >= profile[letter]) return false;
            if (startingLetter && word === "" && letter != self.get('startingLetter')) return false;
            if (max && word.length >= max)  return false;

            word = word += letter;
            self.set('word', word);
            if (subtree.word === true && (!min || word.length >= min)) {
                self.trigger('match', word);
            }
            var innerUsed = _.clone(used);
            self.incrementLetter(innerUsed, letter);  // Keep track of letter usage.
            self.checkTree(subtree.children, profile, innerUsed);
            self.set('word', word.slice(0, word.length-1));
       });
    },

    incrementLetter: function(tree, letter) {
        if (tree[letter] == undefined) {
            tree[letter] = 1;
        } else {
            tree[letter]++;
        }
    }
});
