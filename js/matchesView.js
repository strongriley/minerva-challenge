MatchesView = Backbone.View.extend({
    initialize: function() {
        this.collection.on('add', this.appendMatch, this);
        this.collection.on('reset', this.reset, this);
    },

    appendMatch: function(model, collection, options) {
        $(this.el).append(model.get('id'));
    },

    reset: function() {
        $(this.el).html('Searching...');
    }
});
