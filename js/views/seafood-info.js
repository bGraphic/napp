
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

var SeafoodEnvInfoView = Parse.View.extend({
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


        return this;
    }
});