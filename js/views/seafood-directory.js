var SeafoodDirectoryView = Parse.View.extend({
    el: $("#seafood-collection"),

    initialize: function () {
        var self = this;

        _.bindAll(this, 'addSeafoods', 'addOneSeafood', 'resetSeafoods' );

        this.model.bind("add", this.addSeafoods);
        this.model.bind("reset", this.resetSeafoods);

    },

    addSeafoods: function (seafoods) {
        if(seafoods instanceof Array)
            seafoods.each(this.addOneSeafood);
        else
            this.addOneSeafood(seafoods);

    },

    resetSeafoods: function () {
        this.$el.html("");
        this.model.seafoodCollection.each(this.addOneSeafood);
    },

    addOneSeafood: function (seafood) {
        var seafoodView = new SeafoodListItemView({
            model: seafood
        });
        this.$el.append(seafoodView.render().el);
    }
});