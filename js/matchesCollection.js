MatchesCollection = Backbone.Collection.extend({
    model: MatchModel,

    initialize: function(options) {
        options.listenForWords.on('match', this.handleMatch, this);
        options.listenForWords.on('search', this.reset, this);
    },

    handleMatch: function(word) {
        this.add(new MatchModel({id: word}));
    }
});
