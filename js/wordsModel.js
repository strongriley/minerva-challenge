WordsModel = Backbone.Model.extend({
    url: 'static/words.txt',

    initialize: function() {
        _.bindAll(this);
        // Pre-populate everything
        this.fetch({
            dataType: "text",
            success: this.success,
            error: this.error
        });
    },

    parse: function(text, options) {
        var self, words, tree;
        self = this;
        words = text.split("\n");
        _.each(words, function(word) {
            // TODO build tree
        });

        return tree;
    },


    success: function(model, response, options) {
        console.log(response);
    },

    error: function(model, xhr, options) {
        console.log(xhr);
        console.log(options);
    }
});
