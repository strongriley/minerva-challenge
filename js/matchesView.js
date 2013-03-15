MatchesView = Backbone.View.extend({
    initialize: function() {
        this.collection.on('add', this.render, this);
        this.collection.on('reset', this.reset, this);
    },

    appendMatch: function(model, collection, options) {
        console.log(model);
    },

    reset: function() {
        this.el.html('Searching...');
    }
});
