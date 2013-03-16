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
        if (this.collection.length === 0) {
            $(this.el).html("No matches.");
        } else {
            var html = "<ul>";
            _.each(this.collection.models, function(model) {
                html += model.get('id') + "<br>"
            });
            html += "</ul>";
            $(self.el).html(html);
        }
    }
});
