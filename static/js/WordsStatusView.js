WordsStatusView = Backbone.View.extend({
    initialize: function() {
        $(this.el).addClass("loading");
        this.$('p').html("Loading...");
        this.model.on('change:tree', this.ready, this);
        this.model.on('error', this.error, this);
    },

    ready: function() {
        $(this.el).removeClass("loading error").addClass("ready");
        this.$('p').html("Ready");
    },

    error: function() {
        $(this.el).removeClass("loading ready").addClass("error");
        this.$('p').html("Could not load words. Make sure to load from the SimpleHTTPServer");
    },
});
