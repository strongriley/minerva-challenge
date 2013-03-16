MatchesView = Backbone.View.extend({
    initialize: function() {
        this.collection.on('reset', this.reset, this);
        this.model.on('searchComplete', this.searchComplete, this);
    },

    reset: function() {
        $(this.el).html('Searching...');
    },

    searchComplete: function() {
        var self = this;
        var html = "";
        if (this.collection.length === 0) {
            $(this.el).html("No matches.");
        } else {
            _.each(this.collection.models, function(model) {
                html += model.get('id') + "<br>"
            });
            $(self.el).html(html);
        }
    }
});
