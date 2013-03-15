WordsStatusView = Backbone.View.extend({
    initialize: function() {
        $(this.el).html("Loading...");
        this.model.on('change:tree', this.ready, this);
        this.model.on('error', this.error, this);
    },

    ready: function() {
        $(this.el).html("Ready");
    },

    error: function() {
        $(this.el).html("Could not load words. Make sure to load from the SimpleHTTPServer");
    },
});
