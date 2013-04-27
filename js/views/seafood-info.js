var SeafoodStatusInfoView = Parse.View.extend({
    tagName: "div",

    template: _.template($('#seafoodStatusRedInfoTemplate').html()),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

var SeafoodInfoView = Parse.View.extend({
    tagName: "article",
    className: "info",

    template: _.template($('#seafoodInfoTemplate').html()),

    render: function () {

        this.$el.html(this.template(this.model.toJSON()));

        if(this.model.has("status")) {
            var statusView = new SeafoodStatusInfoView({
                model: this.model
            });

            this.$el.append(statusView.render().el);
        }

        return this;
    }
});