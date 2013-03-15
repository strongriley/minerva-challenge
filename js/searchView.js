SearchView = Backbone.View.extend({
    events: {
        'submit form': 'search'
        // TODO reset event
    },

    search: function(e) {
        e.preventDefault();  // Don't actually do POST or GET
        args = {};

        // Collect search data
        args['letters'] = this.$('#letters').val();
        args['wordRange'] = [
            this.$('#word-size-lower').val(),
            this.$('#word-size-upper').val()
        ];
        args['startingLetter'] = this.$('#starting-letter').val();
        this.model.search(args);
    },

    reset: function(e) {
        this.$('input').each(function(i) {
            this.val('');
        });
    }
});
