var SeafoodView = Parse.View.extend({
    tagName: "li",

    template: _.template($('#seafoodItemTemplate').html()),

    events: {
        "click a.seafood" : "viewSeafoodInfo"
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    viewSeafoodInfo: function () {

        var seafoodInfo = new SeafoodInfoView({
            model: this.model
        });

        if(this.$el.children("article.info").length == 0)
            this.$el.append(seafoodInfo.render().el);

        this.$el.children("article.info").toggle();
        this.$el.find(".seafood i").toggleClass("icon-chevron-down");
        this.$el.find(".seafood i").toggleClass("icon-chevron-right");
    }
});