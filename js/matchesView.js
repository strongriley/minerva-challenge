MatchesView = Backbone.View.extend({
    initialize: function() {
        this.collection.on('add', this.appendMatch, this);
        this.collection.on('reset', this.reset, this);
    },

    appendMatch: function(model, collection, options) {
        if (collection.length === 1) {
            $(this.el).html('');
        }
        $(this.el).append(model.get('id') + "<br>");
    },

    reset: function() {
        $(this.el).html('Searching...');
    }
});
