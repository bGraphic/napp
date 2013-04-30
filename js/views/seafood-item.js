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
            this.$el.find(".seafood i").toggleClass("icon-chevron-down");
            this.$el.find(".seafood i").toggleClass("icon-chevron-right");
        }
    }
});