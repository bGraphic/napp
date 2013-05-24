var SeafoodDirectoryView = Parse.View.extend({
    el: "#seafood-collection",

    initialize: function () {
        var self = this;

        _.bindAll(this, 'addSeafoods', 'addOneSeafood', 'resetSeafoods');

        this.model.bind("add", this.addSeafoods);
        this.model.bind("reset", this.resetSeafoods);
    },

    addSeafoods: function (seafoods) {
        if(seafoods instanceof Array)
            seafoods.each(this.addOneSeafood);
        else
            this.addOneSeafood(seafoods);

    },

    resetSeafoods: function (newCollection) {
        this.$el.html("");
        newCollection.each(this.addOneSeafood);
    },

    addOneSeafood: function (seafood) {
        var seafoodView = new SeafoodListItemView({
            model: seafood
        });
        this.$el.find("ul").append(seafoodView.render().el);
    }
});

var SeafoodListItemView = Parse.View.extend({
    tagName: "li",

    template: _.template($('#seafoodItemTemplate').html()),

    events: {
        "click a.seafood" : "toggleSeafoodInfo"
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    toggleSeafoodInfo: function () {

        if(this.$el.children("article.info")) {
            this.$el.children("article.info").toggle();
            this.$el.find(".seafood i.chevron").toggleClass("icon-chevron-down");
            this.$el.find(".seafood i.chevron").toggleClass("icon-chevron-right");
        }
    }
});