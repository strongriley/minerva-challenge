WordsStatusView = Backbone.View.extend({
    initialize: function() {
        $(this.el).html("Loading...");
        this.model.on('change', this.ready, this);
    },

    ready: function() {
        $(this.el).html("Ready");
    },
});
