$(function() {
    // TODO not global. just for debugging
    words = new WordsModel();
    var matches = new MatchesCollection({
        listenForWords: words
    });

    var wordsStatusView = new WordsStatusView({
        model: words,
        el: $('div#status')
    });
    var searchView = new SearchView({
        model: words,
        el: $('div#search')
    });
    var matchesView = new MatchesView({
        collection: matches,
        el: $('div#matches')
    });
});
