
var SeafoodStatusInfoView = Parse.View.extend({
    tagName: "div",

    initialize: function() {

        this.configureTemplate(this.options.model.get("status"));
    },

    configureTemplate: function(status) {
        if(status == "green")
            this.template = _.template($('#seafoodStatusGreenInfoTemplate').html());
        else if(status == "orange")
            this.template = _.template($('#seafoodStatusOrangeInfoTemplate').html());
        else
            this.template = _.template($('#seafoodStatusRedInfoTemplate').html());
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

var SeafoodEnvStatusInfoView = Parse.View.extend({
    tagName: "div",
    className: "badges",

    initialize: function() {

        this.configureTemplate(this.options.model.get("env_status"));
    },

    configureTemplate: function(status) {
        if(status == "smil")
            this.template = _.template($('#seafoodEnvStatusGoodInfoTemplate').html());
        else if(status == "ok")
            this.template = _.template($('#seafoodEnvStatusOkInfoTemplate').html());
        else if(status == "sur")
            this.template = _.template($('#seafoodEnvStatusBadInfoTemplate').html());
        else
            this.template = _.template($('#seafoodEnvStatusNoneInfoTemplate').html());
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

var SeafoodBadgesView = Parse.View.extend({
    tagName: "div",
    className: "badges",

    template: _.template($('#seafoodBadgesInfoTemplate').html()),

    render: function () {
        if(this.model.has("badges")) {
            this.$el.html(this.template(this.model.toJSON()));
        }

        return this;
    }

});

var SeafoodPictureView = Parse.View.extend({
    tagName: "div",
    className: "picture",

    template: _.template($('#seafoodPictureInfoTemplate').html()),

    render: function () {
        if(this.model.has("img_src"))
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


        var statusView = new SeafoodStatusInfoView({
            model: this.model
        });

        statusView.model = this.model;

        this.$el.append(statusView.render().el);

        var envStatusView = new SeafoodEnvStatusInfoView({
            model: this.model
        });

        envStatusView.model = this.model;

        this.$el.append(envStatusView.render().el);

        var badgesView = new SeafoodBadgesView({
            model: this.model
        });

        badgesView.model = this.model;

        this.$el.append(badgesView.render().el);

        var pictureView = new SeafoodPictureView({
            model: this.model
        });

        pictureView.model = this.model;

        this.$el.append(pictureView.render().el);

        return this;
    }
});