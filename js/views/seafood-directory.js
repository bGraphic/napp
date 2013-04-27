var SeafoodDirectoryView = Parse.View.extend({
    el: $("#seafood-collection"),

    initialize: function () {
        var self = this;

        _.bindAll(this, 'batchRetrieve', 'addSeafoods', 'addOneSeafood', 'resetSeafoods' );

        this.seafoodCollection = new SeafoodCollection();
        this.seafoodCollection.bind("add", this.addSeafoods);
        this.seafoodCollection.bind("reset", this.resetSeafoods);

        this.batchRetrieve(0);

    },

    batchRetrieve: function (startIndex) {
        self = this;
        var limit = 15;

        var query = new Parse.Query(Seafood);
        query.skip(startIndex);
        query.limit(limit);
        query.ascending("name");

        query.find({
            success: function(results) {
                if(startIndex == 0)
                    self.seafoodCollection.add(results);
                else
                    self.seafoodCollection.add(results);

                if(results.length == limit)
                    self.batchRetrieve(startIndex+limit);
                else
                    hideSeafoodCollectionSpinner();
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    },

    addSeafoods: function (seafoods) {
        if(seafoods instanceof Array)
            seafoods.each(this.addOneSeafood);
        else
            this.addOneSeafood(seafoods);

    },

    resetSeafoods: function () {
        this.$el.html("");
        this.seafoodCollection.each(this.addOneSeafood);
    },

    addOneSeafood: function (seafood) {
        var seafoodView = new SeafoodView({
            model: seafood
        });
        this.$el.append(seafoodView.render().el);
    }
});